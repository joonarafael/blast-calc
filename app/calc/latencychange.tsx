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
		} catch (e) {
			console.log(e);
		}
	};

	const handleResetDefaults = () => {
		setLatencySelection([0, 9, 17, 25, 42, 67, 109]);
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
		if (latencySelection.length > 1) {
			const tmp = [...latencySelection];
			tmp.splice(index, 1);

			setLatencySelection(tmp);
			return;
		}

		toast("At least one latency should be available.");
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
		<div className="w-full flex flex-col text-center  max-w-[1080px]">
			<div className="font-bold text-4xl mb-4">CONFIGURE LATENCY SELECTION</div>
			<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 rounded-lg p-4">
				<div className="flex flex-col gap-2 border rounded p-2 border-emerald-500">
					<Button onClick={handleResetDefaults} className="h-full">
						<p className="font-bold text-lg">RESET DEFAULTS</p>
					</Button>
				</div>
				<div className="flex flex-col gap-2 border rounded p-2 border-sky-500">
					<Button onClick={handleSort} className="h-full">
						<p className="font-bold text-lg">SORT LIST</p>
					</Button>
				</div>

				<div className="flex flex-col gap-2 border rounded p-2 border-fuchsia-500 h-full">
					<Button onClick={handleAddNew} className="h-full">
						<p className="font-bold text-lg">ADD NEW</p>
					</Button>
				</div>
				<div className="flex flex-col gap-2 border rounded p-2 border-green-500 h-full">
					<Button onClick={handleSaveChanges} className="h-full">
						<p className="font-bold text-lg">SAVE CHANGES</p>
					</Button>
				</div>
			</div>
			<hr />
			<div className="mt-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 rounded-lg p-4 border">
				{latencySelection.map((item, i) => (
					<div
						key={i}
						className={`h-full flex flex-col gap-2 border rounded p-2 ${
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
			</div>
		</div>
	);
};

export default LatencyChange;
