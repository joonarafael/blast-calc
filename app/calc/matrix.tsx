"use client";

import BoreHole from "./borehole";

interface MatrixProps {
	width: number;
	height: number;
	field: number[][];
	zoom: number;
}

const Matrix: React.FC<MatrixProps> = ({ width, height, field, zoom }) => {
	return (
		<div className="flex flex-col p-2">
			{field.map((row, rowIndex) => (
				<div key={rowIndex} className="flex">
					{row.map((item, colIndex) => (
						<div key={colIndex}>
							<BoreHole index={item} zoom={zoom} />
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Matrix;
