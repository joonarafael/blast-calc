"use client";

interface ToolBarProps {
	tool: string;
	setTool: (tool: string) => void;
	latencySelection: number[];
}

const ToolBar: React.FC<ToolBarProps> = ({
	tool,
	setTool,
	latencySelection,
}) => {
	const handleToolChange = (tool: string) => {
		setTool(tool);
	};

	const commonCSS = `cursor-pointer text-lg hover:pl-4 hover:underline rounded border p-2`;

	return (
		<div className="flex flex-col p-2 gap-2 w-full">
			<div className="font-light text-neutral-500 text-xs">SELECTED TOOL</div>
			<div className="font-bold text-2xl">{tool}</div>
			<hr />
			<div className="font-light text-neutral-500 text-xs">TOOL SELECTION</div>
			<div
				className={`${commonCSS} border-indigo-500`}
				onClick={() => handleToolChange("entry")}
			>
				Entry
			</div>
			{latencySelection.map((item, i) => (
				<div
					key={i}
					className={`${commonCSS}`}
					onClick={() => handleToolChange(`${item}`)}
				>
					{item}
				</div>
			))}
			<div
				className={`${commonCSS} border-neutral-500`}
				onClick={() => handleToolChange("reset")}
			>
				Borehole reset
			</div>
		</div>
	);
};

export default ToolBar;
