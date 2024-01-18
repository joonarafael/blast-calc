"use client";

import { toast } from "sonner";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface LatencyChangeProps {
	latencySelection: number[];
	setLatencySelection: (selection: number[]) => void;
	setLatencyChangeView: (value: boolean) => void;
}

const LatencyChange: React.FC<LatencyChangeProps> = ({
	latencySelection,
	setLatencySelection,
	setLatencyChangeView,
}) => {
	const handleLatencyChange = (index: number, value: string) => {
		try {
			const asNumber = parseInt(value, 10);

			if (asNumber < 0) {
				return;
			} else if (asNumber > 9999) {
				return;
			}

			const tmp = [...latencySelection];
			tmp[index] = asNumber;

			setLatencySelection(tmp);
			console.log(latencySelection);
		} catch (e) {
			console.log(e);
		}
	};

	const handleSort = () => {
		const tmp = [...latencySelection];
		tmp.sort((a, b) => a - b);

		setLatencySelection(tmp);
	};

	const handleAddNew = () => {
		if (latencySelection.length < 16) {
			const tmp = [...latencySelection];
			tmp.push(0);

			setLatencySelection(tmp);
		}
	};

	const handleRemove = (index: number) => {
		const tmp = [...latencySelection];
		tmp.splice(index, 1);

		setLatencySelection(tmp);
	};

	const handleSaveChanges = () => {
		const keys = Object.keys(counts);

		if (keys.length < 1) {
			toast("Add at least one latency.");
			return;
		}

		for (const val of keys) {
			const numVal = parseInt(val, 10);

			if (counts[numVal] !== 1) {
				toast("Do not enter duplicate values.");
				return;
			}
		}

		handleSort();

		setLatencyChangeView(false);
	};

	const counts: Record<number, number> = {};

	for (const num of latencySelection) {
		counts[num] = counts[num] ? counts[num] + 1 : 1;
	}

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 border rounded-lg p-4">
			<div className="flex flex-col gap-2 border rounded p-2 border-sky-500">
				<Button onClick={handleSort} className="h-full">
					<p className="font-bold text-lg">SORT</p>
				</Button>
			</div>
			{latencySelection.map((item, i) => (
				<div
					key={i}
					className={`flex flex-col gap-2 border rounded p-2 ${
						counts[item] > 1 ? "border-red-500" : "border-neutral-500"
					}`}
				>
					<label
						className="text-neutral-500 font-light"
						htmlFor={`latencyTime${i}`}
					>{`LATENCY TIME ${i + 1}`}</label>
					<Input
						value={item}
						type="number"
						id={`latencyTime${i}`}
						placeholder="Field Height"
						onChange={(e) => handleLatencyChange(i, e.target.value)}
					/>
					<Button
						onClick={() => {
							handleRemove(i);
						}}
					>
						<p className="text-lg">REMOVE</p>
					</Button>
				</div>
			))}
			<div className="flex flex-col gap-2 border rounded p-2 border-yellow-500">
				<Button onClick={handleAddNew} className="h-full">
					<p className="font-bold text-lg">ADD NEW</p>
				</Button>
			</div>
			<div className="flex flex-col gap-2 border rounded p-2 border-green-500">
				<Button onClick={handleSaveChanges} className="h-full">
					<p className="font-bold text-lg">
						SAVE
						<br />
						SELECTION
					</p>
				</Button>
			</div>
		</div>
	);
};

export default LatencyChange;
