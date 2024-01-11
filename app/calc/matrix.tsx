"use client";

import BoreHole from "./borehole";

interface MatrixProps {
	width: number;
	height: number;
	field: number[];
}

const Matrix: React.FC<MatrixProps> = ({ width, height, field }) => {
	return (
		<div className="flex flex-col p-2">
			<div
				className={`
                    grid
                    gap-6
                    grid-cols-${width}
                `}
			>
				{field.map((item, i) => {
					return (
						<div key={i} className="col-span-1">
							<BoreHole index={item} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Matrix;
