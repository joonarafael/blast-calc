"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import PageError from "@/app/components/pageerror";
import { DEFAULT_LATENCY_SELECTION } from "@/constants/latencyselection";

import generateAdjacencyList from "../algos/adjacency";
import analyzeMaster from "../algos/analyze/analyze";
import dijkstra from "../algos/dijkstra";
import Container from "../components/container";
import AnalyzeView from "./analyze";
import LatencyChange from "./latencychange";
import Matrix from "./matrix";
import Menu from "./menu";
import ReplacingTool from "./replacingtool";
import eraseAdjacentConnections from "./supports/connections/eraseadjacentconnections";
import getColIndex from "./supports/getcolindex";
import getRowIndex from "./supports/getrowindex";
import twoDimIndexOf from "./supports/indexof";
import initConnection from "./supports/initconnection";
import replaceOldEntry from "./supports/replaceoldentry";
import ToolBar from "./toolbar";

const BREAKPOINT = 1060;

interface CalculatorProps {
	width: number;
	height: number;
	prevFieldStatus?: number[][] | null;
	prevFieldValues?: number[][] | null;
	prevFieldDelays?: number[][] | null;
}

const Calculator: React.FC<CalculatorProps> = ({
	width,
	height,
	prevFieldStatus,
	prevFieldValues,
	prevFieldDelays,
}) => {
	window.onbeforeunload = function () {
		return "Are you sure you want to leave?";
	};

	const [appView, setAppView] = useState("calc");
	const [isLinking, setIsLinking] = useState(true);
	const [zoom, setZoom] = useState(4);
	const [tool, setTool] = useState("cursor");
	const [oldEntryValue, setOldEntryValue] = useState<number | null>(null);
	const [selectedBoreHole, setSelectedBoreHole] = useState<number | null>(null);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [analysis, setAnalysis] = useState<any>(null);
	const [replacingToolView, setReplacingToolView] = useState(false);

	document.addEventListener("keydown", function (event) {
		if (event.key === "+") {
			event.preventDefault();

			if (zoom < 6) {
				setZoom(zoom + 1);
			}
		}
	});

	document.addEventListener("keydown", function (event) {
		if (event.key === "-") {
			event.preventDefault();

			if (zoom > 1) {
				setZoom(zoom - 1);
			}
		}
	});

	useEffect(() => {
		const handleResizeWindow = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResizeWindow);

		return () => {
			window.removeEventListener("resize", handleResizeWindow);
		};
	}, []);

	// master matrix for indexing, does not ever change
	const field = Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
		Array.from(
			{ length: width * 2 - 1 },
			(_, colIndex) => rowIndex * (width * 2 - 1) + colIndex
		)
	);

	const [fieldStatus, setFieldStatus] = useState(() => {
		if (prevFieldStatus) return prevFieldStatus;

		return Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
			Array.from({ length: width * 2 - 1 }, (_, colIndex) => 8)
		);
	});

	const [fieldValues, setFieldValues] = useState(() => {
		if (prevFieldValues) return prevFieldValues;

		return Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
			Array.from({ length: width * 2 - 1 }, (_, colIndex) => 0)
		);
	});

	const [fieldDelays, setFieldDelays] = useState(() => {
		if (prevFieldDelays) return prevFieldDelays;

		return Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
			Array.from({ length: width * 2 - 1 }, (_, colIndex) => 0)
		);
	});

	const debugStates = () => {
		console.log("DEBUG:");
		console.log(field);
		console.log(fieldStatus);
		console.log(fieldValues);
		console.log(fieldDelays);
	};

	const savePlan = () => {
		try {
			const data = {
				width: width,
				height: height,
				fieldStatus: fieldStatus,
				fieldValues: fieldValues,
				fieldDelays: fieldDelays,
			};

			const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
				JSON.stringify(data)
			)}`;

			const link = document.createElement("a");
			link.href = jsonString;
			link.download = "plan.json";

			link.click();
		} catch (err) {
			toast("Error while saving the plan.");
			console.log(err);
		}
	};

	const resetField = () => {
		setSelectedBoreHole(null);
		setTool("cursor");
		setFieldStatus(
			Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
				Array.from({ length: width * 2 - 1 }, (_, colIndex) => 8)
			)
		);
		setFieldValues(
			Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
				Array.from({ length: width * 2 - 1 }, (_, colIndex) => 0)
			)
		);
		setFieldDelays(
			Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
				Array.from({ length: width * 2 - 1 }, (_, colIndex) => 0)
			)
		);
	};

	const [latencySelection, setLatencySelection] = useState(
		DEFAULT_LATENCY_SELECTION
	);

	const updateFieldStatus = (coords: number[], newValue: number) => {
		try {
			if (tool === "entry") {
				replaceOldEntry(fieldStatus, setFieldStatus, oldEntryValue);
				setOldEntryValue(fieldStatus[coords[0]][coords[1]]);
			}

			if (newValue === 10 && fieldStatus[coords[0]][coords[1]] === 9) {
				return;
			}

			setFieldStatus((prevFieldStatus) => {
				const tmp = [...prevFieldStatus];
				tmp[coords[0]] = [...tmp[coords[0]]];
				tmp[coords[0]][coords[1]] = newValue;
				return tmp;
			});
		} catch (err) {
			toast("Error updating field status.");
			console.log(err);
		}
	};

	const updateFieldValue = (coords: number[], newValue: number) => {
		try {
			setFieldValues((prevFieldValues) => {
				const tmp = [...prevFieldValues];
				tmp[coords[0]] = [...tmp[coords[0]]];
				tmp[coords[0]][coords[1]] = newValue;
				return tmp;
			});
		} catch (err) {
			toast("Error updating field value.");
			console.log(err);
		}
	};

	const boreHoleClick = (position: number[]) => {
		try {
			if (tool === "entry") {
				setSelectedBoreHole(null);
				updateFieldStatus(position, 9);
			} else if (tool === "borehole") {
				setSelectedBoreHole(null);
				updateFieldStatus(position, 10);
			} else if (tool === "eraser") {
				setSelectedBoreHole(null);
				updateFieldStatus(position, 8);

				eraseAdjacentConnections(
					position,
					fieldValues,
					updateFieldValue,
					updateFieldStatus
				);
			} else if (tool !== "cursor") {
				if (selectedBoreHole === null) {
					setSelectedBoreHole(position[2]);
				} else {
					initConnection(
						selectedBoreHole,
						position[2],
						width * 2 - 1,
						updateFieldStatus,
						updateFieldValue,
						tool
					);

					if (isLinking) {
						setSelectedBoreHole(position[2]);
					} else {
						setSelectedBoreHole(null);
					}
				}
			}
		} catch (err) {
			toast("Error processing user action.");
			console.log(err);
		}
	};

	const connectionClick = (position: number[]) => {
		try {
			setSelectedBoreHole(null);

			if (tool === "eraser") {
				updateFieldStatus([position[0], position[1]], 0);
				updateFieldValue([position[0], position[1]], 0);
			} else if (tool !== "entry" && tool !== "borehole" && tool !== "cursor") {
				if (
					fieldValues[position[0]][position[1]] === parseInt(tool, 10) ||
					(fieldValues[position[0]][position[1]] === 65535 && tool === "0")
				) {
					const newOrientation = fieldStatus[position[0]][position[1]] + 4;

					if (newOrientation > 7) {
						updateFieldStatus(
							[position[0], position[1]],
							fieldStatus[position[0]][position[1]] - 4
						);
					} else {
						updateFieldStatus(
							[position[0], position[1]],
							fieldStatus[position[0]][position[1]] + 4
						);
					}
				} else if (fieldValues[position[0]][position[1]] !== 0) {
					if (tool === "0") {
						updateFieldValue([position[0], position[1]], 65535);
					} else {
						updateFieldValue([position[0], position[1]], parseInt(tool, 10));
					}
				}
			}
		} catch (err) {
			toast("Error processing user action.");
			console.log(err);
		}
	};

	useEffect(() => {
		setSelectedBoreHole(null);
	}, [tool, isLinking]);

	useEffect(() => {
		try {
			setFieldDelays(
				Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
					Array.from({ length: width * 2 - 1 }, (_, colIndex) => 0)
				)
			);

			const adjacencyList = generateAdjacencyList(fieldStatus, fieldValues);

			const startIndex = twoDimIndexOf(fieldStatus, 9);

			if (startIndex !== -1) {
				const dijkstraResult = dijkstra(adjacencyList, startIndex);

				for (const key in dijkstraResult) {
					if (dijkstraResult.hasOwnProperty(key)) {
						const element = dijkstraResult[key];
						const distance = element.distance;

						const rowIndex = getRowIndex(parseInt(key, 10), width * 2 - 1);
						const colIndex = getColIndex(parseInt(key, 10), width * 2 - 1);

						setFieldDelays((prevFieldDelays) => {
							const tmp = [...prevFieldDelays];
							tmp[rowIndex] = [...tmp[rowIndex]];
							tmp[rowIndex][colIndex] = distance;
							return tmp;
						});
					}
				}
			}
		} catch (err) {
			toast("Error updating field delays.");
			console.log(err);
		}
	}, [fieldStatus, fieldValues, width, height]);

	const runAnalyze = () => {
		try {
			const adjacencyList = generateAdjacencyList(fieldStatus, fieldValues);

			const startIndex = twoDimIndexOf(fieldStatus, 9);

			let delayMap = [];

			if (startIndex !== -1) {
				const dijkstraResult = dijkstra(adjacencyList, startIndex);

				for (const key in dijkstraResult) {
					if (dijkstraResult.hasOwnProperty(key)) {
						const element = dijkstraResult[key];
						const delay = element.distance;

						const borehole = parseInt(key, 10);

						delayMap.push({ borehole, delay });
					}
				}

				const result = analyzeMaster(delayMap);
				setAnalysis(result);

				setAppView("analyze");
			} else {
				toast("No entry borehole found!");
			}
		} catch (err) {
			toast("Error analyzing the field.");
			console.log(err);
		}
	};

	if (appView === "latencyChange") {
		return (
			<Container>
				<div className="flex justify-center mt-16">
					<LatencyChange
						latencySelection={latencySelection}
						setLatencySelection={setLatencySelection}
						setLatencyChangeView={setAppView}
					/>
				</div>
			</Container>
		);
	}

	if (appView === "analyze") {
		return (
			<Container>
				<div className="flex justify-center mt-16">
					<AnalyzeView backToCalc={setAppView} delayGraph={analysis} />
				</div>
			</Container>
		);
	}

	if (windowWidth < BREAKPOINT) {
		return <PageError message={"Window width of 1060px required."} />;
	}

	return (
		<Container>
			<div className="flex flex-col gap-4">
				<Menu
					zoom={zoom}
					setZoom={setZoom}
					resetField={resetField}
					setLatencyChangeView={setAppView}
					debugStates={debugStates}
					setSelectedBoreHole={setSelectedBoreHole}
					setTool={setTool}
					latencySelection={latencySelection}
					isLinking={isLinking}
					setIsLinking={setIsLinking}
					replacingToolView={replacingToolView}
					setReplacingToolView={setReplacingToolView}
					savePlan={savePlan}
					runAnalyze={runAnalyze}
				/>
				<div className="flex flex-row gap-4">
					<div className="border rounded-lg w-5/6 h-[80svh] overflow-scroll bg-secondary/50">
						<div className="w-max">
							<Matrix
								field={field}
								fieldStatus={fieldStatus}
								fieldValues={fieldValues}
								fieldDelays={fieldDelays}
								zoom={zoom}
								tool={tool}
								selectedBoreHole={selectedBoreHole}
								boreHoleClick={boreHoleClick}
								connectionClick={connectionClick}
							/>
						</div>
					</div>
					<div className="border rounded-lg w-1/6">
						<div className="w-full">
							{replacingToolView ? (
								<ReplacingTool
									fieldValues={fieldValues}
									setReplacingToolView={setReplacingToolView}
									latencySelection={latencySelection}
									setFieldValues={setFieldValues}
								/>
							) : (
								<ToolBar
									tool={tool}
									setTool={setTool}
									setIsLinking={setIsLinking}
									isLinking={isLinking}
									latencySelection={latencySelection}
									setLatencyChangeView={setAppView}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Calculator;
