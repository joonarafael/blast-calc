"use client";

import { useState } from "react";
import { toast } from "sonner";

import Container from "@/app/components/container";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import Calculator from "../calculator";

interface Plan {
	width: number;
	height: number;
	fieldStatus: number[][];
	fieldValues: number[][];
	fieldDelays: number[][];
}

const LoadPlanClient = () => {
	const [file, setFile] = useState<File | null>(null);
	const [previousPlan, setPreviousPlan] = useState<Plan | null>(null);

	const handleFile = () => {
		if (!file) {
			return;
		}

		const reader = new FileReader();

		reader.onload = (event) => {
			try {
				const fileContent = event.target?.result as string;
				const jsonData = JSON.parse(fileContent);

				if (
					!jsonData.width ||
					!jsonData.height ||
					!jsonData.fieldStatus ||
					!jsonData.fieldValues ||
					!jsonData.fieldDelays
				) {
					toast("Invalid JSON file.");
					return;
				}

				const { width, height, fieldStatus, fieldValues, fieldDelays } =
					jsonData;

				setPreviousPlan({
					width: width,
					height: height,
					fieldStatus: fieldStatus,
					fieldValues: fieldValues,
					fieldDelays: fieldDelays,
				});
			} catch (error) {
				toast("Error parsing JSON file.");
			}
		};

		reader.readAsText(file);
	};

	if (previousPlan) {
		return (
			<Container>
				<Calculator
					width={previousPlan.width}
					height={previousPlan.height}
					prevFieldStatus={previousPlan.fieldStatus}
					prevFieldValues={previousPlan.fieldValues}
					prevFieldDelays={previousPlan.fieldDelays}
				/>
			</Container>
		);
	}

	return (
		<Container>
			<div className="w-full flex justify-center">
				<div className="max-w-screen-md items-center">
					<div className="w-full flex flex-col gap-4 text-center mt-16">
						<div className="font-bold text-4xl">LOAD PLAN FROM FILE</div>
						<div className="font-light text-neutral-500">
							Resume ongoing work by loading a previous plan from file.
						</div>
						<hr />
						<div>{`Upload your previous plan as a valid '.json' file.`}</div>
						<div className="text-neutral-500 font-light text-sm">
							JSON FILE MUST BE IN THE SAME FORMAT AS IT WAS
							<br />
							WHEN ORIGINALLY DOWNLOADED FROM THE APPLICATION.
						</div>
						<div className="text-yellow-500 border rounded-lg p-2 border-red-500">
							CORRUPTED JSON FILE WILL NOT WORK.
						</div>
						<label htmlFor="fieldWidth">FILE UPLOAD</label>
						<Input
							type="file"
							id="file"
							placeholder="Upload you plan.json file"
							onChange={(e) => {
								if (e.target.files) {
									setFile(e.target.files[0]);
								}
							}}
						/>
						<Button
							disabled={!file}
							onClick={() => {
								handleFile();
							}}
						>
							OPEN
						</Button>
						<Button variant="outline" onClick={() => window.open("/", "_self")}>
							GO BACK
						</Button>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default LoadPlanClient;
