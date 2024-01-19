"use client";

import {
    BsArrowDown, BsArrowDownLeft, BsArrowDownRight, BsArrowLeft, BsArrowRight, BsArrowUp,
    BsArrowUpLeft, BsArrowUpRight
} from 'react-icons/bs';

interface ConnectionProps {
	index: number;
	coords: number[];
	zoom: number;
	status: number;
	value: number;
	connectionClick: (coords: number[]) => void;
}

const Connection: React.FC<ConnectionProps> = ({
	index,
	zoom,
	status,
	value,
	connectionClick,
	coords,
}) => {
	const handleClick = () => {
		connectionClick(coords);
	};

	const commonCSS = `flex items-center justify-center p-2`;

	let size = "text-xs min-w-10 min-h-10";
	let icon = 22;

	if (zoom === 2) {
		size = "text-sm min-w-14 min-h-14";
		icon = 40;
	} else if (zoom === 3) {
		size = "text-base min-w-20 min-h-20";
		icon = 60;
	} else if (zoom === 4) {
		size = "text-base min-w-24 min-h-24";
		icon = 80;
	} else if (zoom === 5) {
		size = "text-base min-w-28 min-h-28";
		icon = 90;
	} else if (zoom === 6) {
		size = "text-base min-w-36 min-h-36";
		icon = 110;
	}

	let interactiveCSS = "";

	if (status !== -1) {
		interactiveCSS = "cursor-pointer hover:font-bold";
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

	return (
		<div
			className={`${commonCSS} ${size} ${interactiveCSS}`}
			onClick={handleClick}
		>
			<div>{status !== -1 ? <div>{arrowElement(value)}</div> : <></>}</div>
		</div>
	);
};

export default Connection;
