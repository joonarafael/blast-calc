"use client";

import { useEffect, useState } from "react";

import Container from "../components/container";
import CableSelection from "./cableselection";
import Matrix from "./matrix";
import ToolBar from "./toolbar";

interface CalculatorProps {
	width: number;
	height: number;
}

const Calculator: React.FC<CalculatorProps> = ({ width, height }) => {
	const [field, setField] = useState(
		Array.from({ length: width * height }, (_, i) => i)
	);

	return (
		<Container>
			<div className="flex flex-col gap-4">
				<ToolBar />
				<div className="flex flex-row gap-4">
					<div className="border rounded-lg w-4/5 overflow-x-scroll">
						<div className="w-max">
							<Matrix width={width} height={height} field={field} />
						</div>
					</div>
					<div className="border rounded-lg w-1/5">
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
