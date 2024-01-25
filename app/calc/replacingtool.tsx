"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";

import { Button } from "../components/ui/button";

interface ReplacingToolProps {
	setReplacingToolView: (value: boolean) => void;
	fieldValues: number[][];
	latencySelection: number[];
}

const ReplacingTool: React.FC<ReplacingToolProps> = ({
	setReplacingToolView,
	fieldValues,
	latencySelection,
}) => {
	const findExistingDelays = (fieldValues: number[][]) => {
		let delays = new Set([0]);

		for (let i = 0; i < fieldValues.length; i++) {
			for (let j = 0; j < fieldValues[i].length; j++) {
				delays.add(fieldValues[i][j]);
			}
		}

		delays.delete(0);

		return Array.from(delays);
	};

	const existingDelays = findExistingDelays(fieldValues);

	return (
		<div className="flex flex-col p-2 gap-2 w-full h-[80svh]">
			<div className="font-light text-neutral-500 text-xs">
				BULK REPLACING TOOL
			</div>
			<Button
				className="h-18"
				onClick={() => {
					setReplacingToolView(false);
				}}
			>
				<p className="font-bold">CLOSE TOOL</p>
			</Button>
			<hr />
			<div className="font-light text-neutral-500 text-xs">TO BE REPLACED</div>
			{existingDelays.length > 0 ? (
				<Select>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="TO BE REPLACED" />
					</SelectTrigger>
					<SelectContent>
						{existingDelays.map((delay) => (
							<SelectItem key={delay} value={delay.toString()}>
								{delay}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			) : (
				<div className="text-base font-bold">NO CONNECTIONS ON THE FIELD</div>
			)}
			<div className="font-light text-neutral-500 text-xs">REPLACE WITH</div>
			{latencySelection.length > 1 ? (
				<Select>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="REPLACE  WITH" />
					</SelectTrigger>
					<SelectContent>
						{latencySelection.map((delay) => (
							<SelectItem key={delay} value={delay.toString()}>
								{delay}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			) : (
				<div className="text-base font-bold">
					NO LATENCY SELECTION AVAILABLE
				</div>
			)}
		</div>
	);
};

export default ReplacingTool;
