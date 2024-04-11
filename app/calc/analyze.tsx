"use client";

import { Button } from "../components/ui/button";

interface AnalyzeViewProps {
	backToCalc: (value: string) => void;
	delayGraph: { delay: number; count: number }[];
}

const AnalyzeView: React.FC<AnalyzeViewProps> = ({
	backToCalc,
	delayGraph,
}) => {
	return (
		<div className="w-full flex flex-col text-center  max-w-[1080px]">
			<div className="font-bold text-4xl mb-4">FIELD ANALYSIS</div>
			<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 rounded-lg p-4">
				<Button
					variant={"outline"}
					onClick={() => {
						backToCalc("calc");
					}}
					className="h-full"
				>
					<p className="font-bold text-lg">BACK TO CALCULATOR</p>
				</Button>
				<Button
					variant={"outline"}
					onClick={() => {}}
					className="h-full"
					disabled
				>
					<p className="font-bold text-lg">DISABLED</p>
				</Button>
				<Button
					disabled
					variant={"secondary"}
					onClick={() => {}}
					className="h-full"
				>
					<p className="font-bold text-lg">DISABLED</p>
				</Button>
				<Button disabled onClick={() => {}} className="h-full">
					<p className="font-bold text-lg">DISABLED</p>
				</Button>
			</div>
			<hr />
			<div className="">{JSON.stringify(delayGraph)}</div>
		</div>
	);
};

export default AnalyzeView;
