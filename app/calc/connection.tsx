"use client";

interface ConnectionProps {
	index: number;
	coords: number[];
	zoom: number;
	status: number;
	connectionClick: (coords: number[]) => void;
}

const Connection: React.FC<ConnectionProps> = ({
	index,
	zoom,
	status,
	connectionClick,
	coords,
}) => {
	const handleClick = () => {
		connectionClick(coords);
	};

	const commonCSS = `flex items-center justify-center p-2`;

	let size = "text-xs min-w-10 min-h-10";

	if (zoom === 2) {
		size = "text-sm min-w-14 min-h-14";
	} else if (zoom === 3) {
		size = "text-base min-w-20 min-h-20";
	} else if (zoom === 4) {
		size = "text-base min-w-24 min-h-24";
	} else if (zoom === 5) {
		size = "text-base min-w-28 min-h-28";
	} else if (zoom === 6) {
		size = "text-base min-w-36 min-h-36";
	}

	let interactiveCSS = "";

	if (status !== -1) {
		interactiveCSS = "cursor-pointer hover:font-bold";
	}

	return (
		<div
			className={`${commonCSS} ${size} ${interactiveCSS}`}
			onClick={handleClick}
		>
			<div>{status !== -1 ? <>{status}</> : <></>}</div>
		</div>
	);
};

export default Connection;
