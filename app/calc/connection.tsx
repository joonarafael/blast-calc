"use client";

import {
	BsArrowDown,
	BsArrowDownLeft,
	BsArrowDownRight,
	BsArrowLeft,
	BsArrowRight,
	BsArrowUp,
	BsArrowUpLeft,
	BsArrowUpRight,
} from "react-icons/bs";

interface ConnectionProps {
	index: number;
	coords: number[];
	zoom: number;
	status: number;
	value: number;
	tool: string;
	connectionClick: (coords: number[]) => void;
}

const Connection: React.FC<ConnectionProps> = ({
	index,
	zoom,
	status,
	tool,
	value,
	connectionClick,
	coords,
}) => {
	const handleClick = () => {
		connectionClick(coords);
	};

	const commonCSS = `
		m-[2px]
		flex
		items-center
		justify-center
		${
			value !== -1 &&
			tool !== "entry" &&
			tool !== "borehole" &&
			"hover:bg-red-300 hover:border cursor-pointer"
		}
		rounded-2xl`;

	let size = "text-xs min-w-10 min-h-10";
	let icon = 32;

	if (zoom === 2) {
		size = "text-sm min-w-14 min-h-14";
		icon = 48;
	} else if (zoom === 3) {
		size = "text-base min-w-20 min-h-20";
		icon = 78;
	} else if (zoom === 4) {
		size = "text-lg min-w-24 min-h-24";
		icon = 90;
	} else if (zoom === 5) {
		size = "text-xl min-w-28 min-h-28";
		icon = 106;
	} else if (zoom === 6) {
		size = "text-2xl min-w-36 min-h-36";
		icon = 132;
	}

	const arrowElement = (orientation: number) => {
		if (orientation === 0) {
			return <BsArrowUp size={icon} />;
		} else if (orientation === 1) {
			return <BsArrowUpRight size={icon} />;
		} else if (orientation === 2) {
			return <BsArrowRight size={icon} />;
		} else if (orientation === 3) {
			return <BsArrowDownRight size={icon} />;
		} else if (orientation === 4) {
			return <BsArrowDown size={icon} />;
		} else if (orientation === 5) {
			return <BsArrowDownLeft size={icon} />;
		} else if (orientation === 6) {
			return <BsArrowLeft size={icon} />;
		}

		return <BsArrowUpLeft size={icon} />;
	};

	let labelTransforms = "bottom-0 left-2/4 -translate-x-2/4";

	if (value === 1) {
		labelTransforms = "bottom-0 left-0";
	} else if (value === 2) {
		labelTransforms = "top-2/4 left-0 -translate-y-2/4";
	} else if (value === 3) {
		labelTransforms = "top-0 left-0";
	} else if (value === 4) {
		labelTransforms = "top-0 left-2/4 -translate-x-2/4";
	} else if (value === 5) {
		labelTransforms = "top-0 right-0";
	} else if (value === 6) {
		labelTransforms = "top-2/4 right-0 -translate-y-2/4";
	} else if (value === 7) {
		labelTransforms = "bottom-0 right-0";
	}

	return (
		<div className={`${commonCSS} ${size}`} onClick={handleClick}>
			<div>
				{status !== -1 ? (
					<div className="relative">
						<div>{arrowElement(value)}</div>
						{zoom > 2 && (
							<div
								className={`z-99 absolute bg-zinc-900 p-1 rounded-xl ${labelTransforms}`}
							>
								{status}
							</div>
						)}
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Connection;
