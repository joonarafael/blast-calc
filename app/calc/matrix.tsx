"use client";

import BoreHole from "./borehole";
import Connection from "./connection";

interface MatrixProps {
	field: number[][];
	fieldStatus: number[][];
	fieldValues: number[][];
	fieldDelays: number[][];
	zoom: number;
	selectedBoreHole?: number | null;
	boreHoleClick: (coords: number[]) => void;
	connectionClick: (coords: number[]) => void;
	tool: string;
}

const Matrix: React.FC<MatrixProps> = ({
	field,
	fieldStatus,
	fieldValues,
	fieldDelays,
	zoom,
	selectedBoreHole,
	boreHoleClick,
	connectionClick,
	tool,
}) => {
	return (
		<div className="flex flex-col p-2">
			{field.map((row, rowIndex) => (
				<div key={rowIndex} className="flex">
					{row.map((item, colIndex) => (
						<div key={colIndex}>
							{rowIndex % 2 === 0 ? (
								<>
									{colIndex % 2 === 0 ? (
										<BoreHole
											index={item}
											coords={[rowIndex, colIndex]}
											zoom={zoom}
											status={fieldStatus[rowIndex][colIndex]}
											value={fieldValues[rowIndex][colIndex]}
											delay={fieldDelays[rowIndex][colIndex]}
											selectedBoreHole={selectedBoreHole}
											boreHoleClick={boreHoleClick}
										/>
									) : (
										<Connection
											index={item}
											coords={[rowIndex, colIndex]}
											zoom={zoom}
											tool={tool}
											status={fieldStatus[rowIndex][colIndex]}
											value={fieldValues[rowIndex][colIndex]}
											connectionClick={connectionClick}
										/>
									)}
								</>
							) : (
								<Connection
									index={item}
									coords={[rowIndex, colIndex]}
									zoom={zoom}
									tool={tool}
									status={fieldStatus[rowIndex][colIndex]}
									value={fieldValues[rowIndex][colIndex]}
									connectionClick={connectionClick}
								/>
							)}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Matrix;
