"use client";

import { useEffect, useState } from "react";

import Container from "../components/container";
import LatencyChange from "./latencychange";
import Matrix from "./matrix";
import Menu from "./menu";
import initConnection from "./supports/initconnection";
import replaceOldEntry from "./supports/replaceoldentry";
import ToolBar from "./toolbar";

interface CalculatorProps {
	width: number;
	height: number;
}

const Calculator: React.FC<CalculatorProps> = ({ width, height }) => {
	const [latencyChangeView, setLatencyChangeView] = useState(false);

	const field = Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
		Array.from(
			{ length: width * 2 - 1 },
			(_, colIndex) => rowIndex * (width * 2 - 1) + colIndex
		)
	);

	const [fieldStatus, setFieldStatus] = useState(() => {
		return Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
			Array.from({ length: width * 2 - 1 }, (_, colIndex) => -1)
		);
	});

	const resetField = () => {
		setSelectedBoreHole(null);
		setTool("entry");
		setFieldStatus(
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

	const updateFieldValue = (coords: number[], newValue: number) => {
		if (tool === "entry") {
			replaceOldEntry(fieldStatus, setFieldStatus);
		}

		const tmp = [...fieldStatus];
		tmp[coords[0]] = [...tmp[coords[0]]];
		tmp[coords[0]][coords[1]] = newValue;

		setFieldStatus(tmp);
	};

	const boreHoleClick = (position: number[]) => {
		if (tool === "entry") {
			updateFieldValue(position, 0);
		} else if (tool === "eraser") {
			updateFieldValue(position, -1);
		} else {
			if (selectedBoreHole === null) {
				setSelectedBoreHole(position[2]);
			} else {
				initConnection(
					selectedBoreHole,
					position[2],
					width * 2 - 1,
					updateFieldValue,
					tool
				);
				setSelectedBoreHole(null);
			}
		}
	};

	const connectionClick = (position: number[]) => {
		if (tool === "eraser") {
			updateFieldValue([position[0], position[1]], -1);
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
				/>
				<div className="flex flex-row gap-4">
					<div className="border rounded-lg w-5/6 h-[80svh] overflow-scroll">
						<div className="w-max">
							<Matrix
								width={width}
								height={height}
								field={field}
								fieldStatus={fieldStatus}
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
