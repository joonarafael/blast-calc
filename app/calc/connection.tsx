"use client";

interface ConnectionProps {
	index: number;
	zoom: number;
}

const Connection: React.FC<ConnectionProps> = ({ index, zoom }) => {
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

	return (
		<div className={`${commonCSS} ${size}`}>
			<div>c</div>
		</div>
	);
};

export default Connection;
