"use client";

import { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

import Container from "../components/container";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import LatencyChange from "./latencychange";
import Matrix from "./matrix";
import Menu from "./menu";
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
			(_, colIndex) => rowIndex * width + colIndex
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

	const replaceOldEntry = () => {
		let tmp = [...fieldStatus];

		let rowIndex, columnIndex;

		outerLoop: for (let i = 0; i < tmp.length; i++) {
			for (let j = 0; j < tmp[i].length; j++) {
				if (tmp[i][j] === 0) {
					rowIndex = i;
					columnIndex = j;
					break outerLoop;
				}
			}
		}

		if (rowIndex !== undefined && columnIndex !== undefined) {
			tmp[rowIndex][columnIndex] = -1;
		}

		setFieldStatus(tmp);
	};

	const updateFieldValue = (coords: number[], newValue: number) => {
		if (tool === "entry") {
			replaceOldEntry();
		}

		setFieldStatus((prevFieldStatus) => {
			const newFieldStatus = [...prevFieldStatus];
			newFieldStatus[coords[0]] = [...newFieldStatus[coords[0]]];
			newFieldStatus[coords[0]][coords[1]] = newValue;

			return newFieldStatus;
		});
	};

	const boreHoleClick = (position: number[]) => {
		if (tool === "entry") {
			updateFieldValue(position, 0);
		} else if (tool === "reset") {
			updateFieldValue(position, -1);
		} else {
			if (selectedBoreHole === null) {
				setSelectedBoreHole(position[2]);
			} else {
				console.log(position[2]);
			}
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
							/>
						</div>
					</div>
					<div className="border rounded-lg w-1/6">
						<div className="w-full">
							<ToolBar
								tool={tool}
								setTool={setTool}
								latencySelection={latencySelection}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Calculator;
