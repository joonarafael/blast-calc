"use client";

import { Button } from "../components/ui/button";

interface ToolBarProps {
	tool: string;
	setTool: (tool: string) => void;
	latencySelection: number[];
	setLatencyChangeView: (value: boolean) => void;
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

	const commonCSS = `cursor-pointer text-lg hover:pl-4 hover:underline rounded border p-2`;

	return (
		<div className="flex flex-col p-2 gap-2 w-full h-[80svh]">
			<div className="font-light text-neutral-500 text-xs">SELECTED TOOL</div>
			<div className="font-bold text-3xl">{tool}</div>
			<div
				onClick={toggleIsLinking}
				className="font-light text-neutral-500 text-xs flex flex-row gap-1 hover:underline cursor-pointer"
			>
				LINKING IS{" "}
				{isLinking ? (
					<p className="text-green-500">ON</p>
				) : (
					<p className="text-red-500">OFF</p>
				)}
			</div>
			<hr />
			<Button
				className="h-18"
				variant={"secondary"}
				onClick={() => {
					setLatencyChangeView(true);
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
			<hr />
			<div className="font-light text-neutral-500 text-xs">TOOL SELECTION</div>
			<div className="overflow-y-scroll flex flex-col gap-1 pr-1">
				<div
					className={`${commonCSS} border-sky-500`}
					onClick={() => setTool("cursor")}
				>
					CURSOR
				</div>
				<div
					className={`${commonCSS} border-indigo-500`}
					onClick={() => setTool("entry")}
				>
					ENTRY
				</div>
				<div
					className={`${commonCSS} border-green-500`}
					onClick={() => setTool("borehole")}
				>
					BOREHOLE
				</div>
				<div
					className={`${commonCSS} border-pink-500`}
					onClick={() => setTool("eraser")}
				>
					ERASER
				</div>

				<hr className="my-1" />
				{latencySelection.map((item, i) => (
					<div
						key={i}
						className={`${commonCSS}`}
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
