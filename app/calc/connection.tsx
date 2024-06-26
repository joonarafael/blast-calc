"use client";

import {
	TbArrowDownCircle,
	TbArrowDownLeftCircle,
	TbArrowDownRightCircle,
	TbArrowLeftCircle,
	TbArrowRightCircle,
	TbArrowUpCircle,
	TbArrowUpLeftCircle,
	TbArrowUpRightCircle,
} from "react-icons/tb";

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
			value !== 0 &&
			tool !== "entry" &&
			tool !== "borehole" &&
			"hover:bg-red-300 cursor-pointer"
		}
		rounded-2xl`;

	let size = "text-xs min-w-10 min-h-10";
	let icon = 44;

	if (zoom === 2) {
		size = "text-sm min-w-14 min-h-14";
		icon = 64;
	} else if (zoom === 3) {
		size = "text-base min-w-20 min-h-20";
		icon = 96;
	} else if (zoom === 4) {
		size = "text-xl min-w-24 min-h-24";
		icon = 112;
	} else if (zoom === 5) {
		size = "text-2xl min-w-28 min-h-28";
		icon = 132;
	} else if (zoom === 6) {
		size = "text-3xl min-w-36 min-h-36";
		icon = 168;
	}

	const arrowElement = (orientation: number) => {
		if (orientation === 0) {
			return <TbArrowUpCircle size={icon} color="silver" />;
		} else if (orientation === 1) {
			return <TbArrowUpRightCircle size={icon} color="silver" />;
		} else if (orientation === 2) {
			return <TbArrowRightCircle size={icon} color="silver" />;
		} else if (orientation === 3) {
			return <TbArrowDownRightCircle size={icon} color="silver" />;
		} else if (orientation === 4) {
			return <TbArrowDownCircle size={icon} color="silver" />;
		} else if (orientation === 5) {
			return <TbArrowDownLeftCircle size={icon} color="silver" />;
		} else if (orientation === 6) {
			return <TbArrowLeftCircle size={icon} color="silver" />;
		}

		return <TbArrowUpLeftCircle size={icon} color="silver" />;
	};

	return (
		<div className={`${commonCSS} ${size} group`} onClick={handleClick}>
			<div>
				{value !== 0 ? (
					<div className="relative">
						<div className="absolute z-2 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
							{arrowElement(status)}
						</div>
						{zoom > 2 ? (
							<div
								className={`z-6 absolute bg-slate-950/80 px-1 rounded-xl drop-shadow-lg top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 font-bold text-gray-100`}
							>
								{value === 65535 ? "0" : `${value}`}
							</div>
						) : (
							<span
								className="
									group-hover:opacity-100
									transition-opacity
									bg-gray-800
									text-xs
									text-gray-100
									rounded-lg
									absolute
									bottom-0
									right-0
									opacity-0
									p-1"
							>
								{value === 65535 ? "0" : `${value}`}
							</span>
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
