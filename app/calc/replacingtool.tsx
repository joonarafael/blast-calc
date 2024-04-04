"use client";

import { useState } from 'react';
import { toast } from 'sonner';

import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/app/components/ui/select';

import { Button } from '../components/ui/button';
import replaceAllEqualTo from './supports/replaceallequalto';

interface ReplacingToolProps {
	setReplacingToolView: (value: boolean) => void;
	fieldValues: number[][];
	latencySelection: number[];
	setFieldValues: (value: number[][]) => void;
}

const ReplacingTool: React.FC<ReplacingToolProps> = ({
	setReplacingToolView,
	fieldValues,
	latencySelection,
	setFieldValues,
}) => {
	const [oldValue, setOldValue] = useState<string | undefined>(undefined);
	const [newValue, setNewValue] = useState<string | undefined>(undefined);

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

	const handleClick = () => {
		if (
			oldValue !== undefined &&
			newValue !== undefined &&
			oldValue !== newValue
		) {
			replaceAllEqualTo(
				fieldValues,
				setFieldValues,
				parseInt(oldValue, 10),
				parseInt(newValue, 10)
			);

			setOldValue(undefined);
			setNewValue(undefined);

			toast("Replacing successful!");

			return;
		}
		toast("Invalid selections");
	};

	return (
		<div className="flex flex-col p-2 gap-2 w-full h-[80svh]">
			<div className="font-light text-neutral-500 text-xs">
				BULK REPLACING TOOL
			</div>
			<Button
				className="h-18"
				variant={"destructive"}
				onClick={() => {
					setReplacingToolView(false);
				}}
			>
				<p className="font-bold">CLOSE TOOL</p>
			</Button>
			<hr />
			<div className="font-light text-neutral-500 text-xs">TO BE REPLACED</div>
			{existingDelays.length > 0 ? (
				<Select value={oldValue} onValueChange={setOldValue}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="TO BE REPLACED" />
					</SelectTrigger>
					<SelectContent>
						{existingDelays.map((delay) => (
							<>
								{delay === 65535 ? (
									<SelectItem key={delay} value={delay.toString()}>
										{"0"}
									</SelectItem>
								) : (
									<SelectItem key={delay} value={delay.toString()}>
										{delay}
									</SelectItem>
								)}
							</>
						))}
					</SelectContent>
				</Select>
			) : (
				<Button disabled variant={"outline"}>
					<p className="font-bold">NO CONNECTIONS</p>
				</Button>
			)}
			<div className="font-light text-neutral-500 text-xs">REPLACE WITH</div>
			{latencySelection.length > 1 ? (
				<Select value={newValue} onValueChange={setNewValue}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="REPLACE  WITH" />
					</SelectTrigger>
					<SelectContent>
						{latencySelection.map((delay) => (
							<>
								{delay === 0 ? (
									<SelectItem key={delay} value={"65535"}>
										{"0"}
									</SelectItem>
								) : (
									<SelectItem key={delay} value={delay.toString()}>
										{delay}
									</SelectItem>
								)}
							</>
						))}
					</SelectContent>
				</Select>
			) : (
				<div className="text-base font-bold">
					NO LATENCY SELECTION AVAILABLE
				</div>
			)}
			<hr />
			{oldValue && newValue && oldValue !== newValue ? (
				<Button onClick={handleClick}>
					<p className="font-bold">REPLACE</p>
				</Button>
			) : (
				<Button disabled>
					<p className="font-bold">REPLACE</p>
				</Button>
			)}
		</div>
	);
};

export default ReplacingTool;
