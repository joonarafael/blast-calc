"use client";

interface BoreHoleProps {
	index: number;
	zoom: number;
}

const BoreHole: React.FC<BoreHoleProps> = ({ index, zoom }) => {
	if (zoom === 1) {
		return (
			<div className={`border rounded p-2 min-w-10 min-h-10`}>
				<div className="text-xs">z</div>
			</div>
		);
	}

	if (zoom === 2) {
		return (
			<div className={`border rounded p-2 min-w-14 min-h-14`}>
				<div className="text-sm">{index}</div>
			</div>
		);
	}

	if (zoom === 3) {
		return (
			<div className={`border rounded p-2 min-w-20 min-h-20`}>
				<div className="text-base">{index}</div>
			</div>
		);
	}

	if (zoom === 4) {
		return (
			<div className={`border rounded p-2 min-w-24 min-h-24`}>
				<div>{index}</div>
			</div>
		);
	}

	if (zoom === 5) {
		return (
			<div className={`border rounded p-2 min-w-28 min-h-28`}>
				<div>{index}</div>
			</div>
		);
	}

	return (
		<div className={`border rounded p-2 min-w-36 min-h-36`}>
			<div>{index}</div>
		</div>
	);
};

export default BoreHole;
