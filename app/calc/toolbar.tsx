"use client";

import { Button } from "../components/ui/button";

interface ToolBarProps {
	tool: string;
	setTool: (tool: string) => void;
	latencySelection: number[];
	setLatencyChangeView: (value: boolean) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({
	tool,
	setTool,
	latencySelection,
	setLatencyChangeView,
}) => {
	const commonCSS = `cursor-pointer text-lg hover:pl-4 hover:underline rounded border p-2`;

	return (
		<div className="flex flex-col p-2 gap-2 w-full">
			<div className="font-light text-neutral-500 text-xs">SELECTED TOOL</div>
			<div className="font-bold text-3xl">{tool}</div>
			<hr />
			<div className="font-light text-neutral-500 text-xs">TOOL SELECTION</div>
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
			{latencySelection.map((item, i) => (
				<div
					key={i}
					className={`${commonCSS}`}
					onClick={() => setTool(`${item}`)}
				>
					{`${item} ms`}
				</div>
			))}
			<hr />
			<Button
				className="h-full"
				onClick={() => {
					setLatencyChangeView(true);
				}}
			>
				<p className="font-bold">
					CONFIGURE
					<br />
					LATENCY
					<br />
					SELECTION
				</p>
			</Button>
		</div>
	);
};

export default ToolBar;
