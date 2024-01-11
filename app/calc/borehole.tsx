"use client";

interface BoreHoleProps {
	index: number;
}

const BoreHole: React.FC<BoreHoleProps> = ({ index }) => {
	return (
		<div className="border">
			<div>{index}</div>
		</div>
	);
};

export default BoreHole;
