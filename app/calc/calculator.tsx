"use client";

import { useEffect, useState } from "react";

import Container from "../components/container";
import LatencyChange from "./latencychange";
import Matrix from "./matrix";
import Menu from "./menu";
import checkUnconnectedBoreholes from "./supports/boreholes/checkunconnectedboreholes";
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
		console.log("DEBUG:");
		console.log(field);
		console.log(fieldStatus);
		console.log(fieldValues);
	};

	const resetField = () => {
		setSelectedBoreHole(null);
		setTool("entry");
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
	};

	const [latencySelection, setLatencySelection] = useState([
		0, 9, 17, 25, 42, 67, 109,
	]);

	const [zoom, setZoom] = useState(4);

	const [tool, setTool] = useState("entry");

	const [selectedBoreHole, setSelectedBoreHole] = useState<number | null>(null);

	const updateFieldStatus = (coords: number[], newValue: number) => {
		if (tool === "entry") {
			replaceOldEntry(fieldStatus, setFieldStatus);
		}

		if (newValue === 2 && fieldStatus[coords[0]][coords[1]] === 0) {
			return;
		}

		setFieldStatus((prevFieldStatus) => {
			const tmp = [...prevFieldStatus];
			tmp[coords[0]] = [...tmp[coords[0]]];
			tmp[coords[0]][coords[1]] = newValue;
			return tmp;
		});
	};

	const updateFieldValue = (coords: number[], newValue: number) => {
		setFieldValues((prevFieldValues) => {
			const tmp = [...prevFieldValues];
			tmp[coords[0]] = [...tmp[coords[0]]];
			tmp[coords[0]][coords[1]] = newValue;
			return tmp;
		});
	};

	const checkForUnconnected = (position: number[]) => {
		setFieldValues((prevFieldValues) => {
			const tmp = [...prevFieldValues];
			tmp[position[0]] = [...tmp[position[0]]];
			tmp[position[0]][position[1]] = -1;
			return tmp;
		});

		checkUnconnectedBoreholes(
			position,
			fieldValues,
			updateFieldValue,
			updateFieldStatus
		);
	};

	const boreHoleClick = (position: number[]) => {
		if (tool === "entry") {
			updateFieldStatus(position, 0);
		} else if (tool === "eraser") {
			updateFieldStatus(position, -1);

			eraseAdjacentConnections(
				position,
				fieldValues,
				updateFieldValue,
				updateFieldStatus
			);

			checkForUnconnected(position);
		} else {
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
				setSelectedBoreHole(null);
			}
		}
	};

	const connectionClick = (position: number[]) => {
		if (tool === "eraser") {
			updateFieldStatus([position[0], position[1]], -1);
			updateFieldValue([position[0], position[1]], 0);
		}
	};

	useEffect(() => {
		setSelectedBoreHole(null);
	}, [tool]);

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

	return (
		<Container>
			<div className="flex flex-col gap-4">
				<Menu
					zoom={zoom}
					setZoom={setZoom}
					resetField={resetField}
					setLatencyChangeView={setLatencyChangeView}
					debugStates={debugStates}
				/>
				<div className="flex flex-row gap-4">
					<div className="border rounded-lg w-5/6 h-[80svh] overflow-scroll">
						<div className="w-max">
							<Matrix
								width={width}
								height={height}
								field={field}
								fieldStatus={fieldStatus}
								fieldValues={fieldValues}
								zoom={zoom}
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
