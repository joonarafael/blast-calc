"use client";

import { useEffect, useState } from "react";

import PageError from "@/app/components/pageerror";

import Container from "../components/container";
import LatencyChange from "./latencychange";
import Matrix from "./matrix";
import Menu from "./menu";
import eraseAdjacentConnections from "./supports/connections/eraseadjacentconnections";
import initConnection from "./supports/initconnection";
import replaceOldEntry from "./supports/replaceoldentry";
import ToolBar from "./toolbar";

interface CalculatorProps {
	width: number;
	height: number;
}

const Calculator: React.FC<CalculatorProps> = ({ width, height }) => {
	const [latencyChangeView, setLatencyChangeView] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLinking, setIsLinking] = useState(true);
	const [zoom, setZoom] = useState(4);
	const [tool, setTool] = useState("cursor");
	const [selectedBoreHole, setSelectedBoreHole] = useState<number | null>(null);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const breakpoint = 1060;

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

	// field status keeps track of different types of boreholes and individual connection latencies
	const [fieldStatus, setFieldStatus] = useState(() => {
		return Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
			Array.from({ length: width * 2 - 1 }, (_, colIndex) => -1)
		);
	});

	// field values stores the actual calculated latencies and connection direction
	const [fieldValues, setFieldValues] = useState(() => {
		return Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
			Array.from({ length: width * 2 - 1 }, (_, colIndex) => -1)
		);
	});

	const debugStates = () => {
		if (!isLoading) {
			console.log("DEBUG:");
			console.log(field);
			console.log(fieldStatus);
			console.log(fieldValues);
		}
	};

	const resetField = () => {
		if (!isLoading) {
			setSelectedBoreHole(null);
			setTool("cursor");
			setFieldStatus(
				Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
					Array.from({ length: width * 2 - 1 }, (_, colIndex) => -1)
				)
			);
			setFieldValues(
				Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
					Array.from({ length: width * 2 - 1 }, (_, colIndex) => -1)
				)
			);
		}
	};

	const [latencySelection, setLatencySelection] = useState([
		0, 9, 17, 25, 42, 67, 109,
	]);

	const updateFieldStatus = (coords: number[], newValue: number) => {
		if (!isLoading) {
			setIsLoading(true);
			if (tool === "entry") {
				replaceOldEntry(fieldStatus, setFieldStatus);
			}

			if (newValue === 1 && fieldStatus[coords[0]][coords[1]] === 0) {
				return;
			}

			setFieldStatus((prevFieldStatus) => {
				const tmp = [...prevFieldStatus];
				tmp[coords[0]] = [...tmp[coords[0]]];
				tmp[coords[0]][coords[1]] = newValue;
				return tmp;
			});
			setIsLoading(false);
		}
	};

	const updateFieldValue = (coords: number[], newValue: number) => {
		if (!isLoading) {
			setIsLoading(true);
			setFieldValues((prevFieldValues) => {
				const tmp = [...prevFieldValues];
				tmp[coords[0]] = [...tmp[coords[0]]];
				tmp[coords[0]][coords[1]] = newValue;
				return tmp;
			});
			setIsLoading(false);
		}
	};

	const boreHoleClick = (position: number[]) => {
		if (!isLoading) {
			setIsLoading(true);
			if (tool === "entry") {
				updateFieldStatus(position, 0);
			} else if (tool === "borehole") {
				updateFieldStatus(position, 1);
			} else if (tool === "eraser") {
				updateFieldStatus(position, -1);

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

			setIsLoading(false);
		}
	};

	const connectionClick = (position: number[]) => {
		if (!isLoading) {
			setIsLoading(true);

			if (tool === "eraser") {
				updateFieldStatus([position[0], position[1]], -1);
				updateFieldValue([position[0], position[1]], 0);
			} else if (tool !== "entry" && tool !== "borehole" && tool !== "cursor") {
				if (fieldStatus[position[0]][position[1]] !== -1) {
					updateFieldStatus([position[0], position[1]], parseInt(tool, 10));
				}
			}

			setIsLoading(false);
		}
	};

	useEffect(() => {
		setSelectedBoreHole(null);
	}, [tool, isLinking]);

	if (latencyChangeView) {
		return (
			<Container>
				<div className="flex justify-center mt-16">
					<LatencyChange
						latencySelection={latencySelection}
						setLatencySelection={setLatencySelection}
						setLatencyChangeView={setLatencyChangeView}
					/>
				</div>
			</Container>
		);
	}

	if (windowWidth < breakpoint) {
		return <PageError message={"Window width of 1060px required."} />;
	}

	return (
		<Container>
			<div className="flex flex-col gap-4">
				<Menu
					zoom={zoom}
					setZoom={setZoom}
					resetField={resetField}
					setLatencyChangeView={setLatencyChangeView}
					debugStates={debugStates}
					setSelectedBoreHole={setSelectedBoreHole}
					setTool={setTool}
					latencySelection={latencySelection}
					isLinking={isLinking}
					setIsLinking={setIsLinking}
				/>
				<div className="flex flex-row gap-4">
					<div className="border rounded-lg w-5/6 h-[80svh] overflow-scroll">
						<div className="w-max">
							<Matrix
								field={field}
								fieldStatus={fieldStatus}
								fieldValues={fieldValues}
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
							<ToolBar
								tool={tool}
								setTool={setTool}
								setIsLinking={setIsLinking}
								isLinking={isLinking}
								latencySelection={latencySelection}
								setLatencyChangeView={setLatencyChangeView}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Calculator;
