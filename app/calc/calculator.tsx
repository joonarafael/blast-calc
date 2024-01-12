"use client";

import { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

import Container from "../components/container";
import CableSelection from "./cableselection";
import Matrix from "./matrix";
import ToolBar from "./toolbar";

interface CalculatorProps {
	width: number;
	height: number;
}

const Calculator: React.FC<CalculatorProps> = ({ width, height }) => {
	const [field, setField] = useState(() => {
		return Array.from({ length: height }, (_, rowIndex) =>
			Array.from(
				{ length: width },
				(_, colIndex) => rowIndex * width + colIndex
			)
		);
	});

	const [zoom, setZoom] = useState(6);

	return (
		<Container>
			<div className="flex flex-col gap-4">
				<ToolBar zoom={zoom} setZoom={setZoom} />
				<div className="flex flex-row gap-4">
					<div className="border rounded-lg w-5/6 h-[80svh] overflow-scroll">
						<div className="w-max">
							<Matrix width={width} height={height} field={field} zoom={zoom} />
						</div>
					</div>
					<div className="border rounded-lg w-1/6">
						<div className="w-max">
							<CableSelection />
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Calculator;
