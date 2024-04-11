"use client";

import { Button } from "../components/ui/button";

interface ToolBarProps {
	tool: string;
	setTool: (tool: string) => void;
	latencySelection: number[];
	setLatencyChangeView: (value: string) => void;
	isLinking: boolean;
	setIsLinking: (value: boolean) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({
	tool,
	setTool,
	latencySelection,
	isLinking,
	setLatencyChangeView,
	setIsLinking,
}) => {
	const toggleIsLinking = () => {
		setIsLinking(!isLinking);
	};

	const commonCSS = `cursor-pointer text-lg hover:pl-4 hover:underline rounded border border-2 p-2`;

	const toolList = ["cursor", "entry", "borehole", "eraser"];

	return (
		<div className="flex flex-col p-2 gap-2 w-full h-[80svh]">
			{toolList.includes(tool) ? (
				<div className="font-light text-neutral-500 text-xs">SELECTED TOOL</div>
			) : (
				<div className="font-light text-neutral-500 text-xs">
					SELECTED DELAY
				</div>
			)}

			<div className="font-bold text-3xl">{tool}</div>
			<div
				onClick={toggleIsLinking}
				className="font-light text-neutral-500 text-xs flex flex-row gap-1 hover:underline cursor-pointer"
			>
				<p
					className={isLinking ? "text-green-500" : "text-rose-500"}
				>{`LINKING IS ${isLinking ? "ON" : "OFF"}`}</p>
			</div>
			<hr />
			<div className="font-light text-neutral-500 text-xs">TOOL SELECTION</div>
			<div className="overflow-y-scroll flex flex-col gap-1 pr-1">
				<div
					className={`${commonCSS} border-sky-500 border-2 text-white bg-sky-700/50`}
					onClick={() => setTool("cursor")}
				>
					CURSOR
				</div>
				<div
					className={`${commonCSS} border-indigo-500 border-2 text-white bg-indigo-700/50`}
					onClick={() => setTool("entry")}
				>
					ENTRY
				</div>
				<div
					className={`${commonCSS} border-green-500 border-2 text-white bg-green-700/50`}
					onClick={() => setTool("borehole")}
				>
					BOREHOLE
				</div>
				<div
					className={`${commonCSS} border-pink-500 border-2 text-white bg-pink-700/50`}
					onClick={() => setTool("eraser")}
				>
					ERASER
				</div>
				<hr className="my-1" />
				<Button
					className="h-18"
					variant="outline"
					onClick={() => {
						setLatencyChangeView("latencyChange");
					}}
				>
					<p className="font-bold">
						CONFIGURE
						<br />
						DELAY
						<br />
						SELECTION
					</p>
				</Button>
				<hr className="my-1" />
				<div className="font-light text-neutral-500 text-xs">
					DELAY SELECTION
				</div>
				{latencySelection.map((item, i) => (
					<div
						key={i}
						className={`${commonCSS} bg-secondary/50`}
						onClick={() => setTool(`${item}`)}
					>
						{`${item} ms`}
					</div>
				))}
			</div>
		</div>
	);
};

export default ToolBar;
