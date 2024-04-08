"use client";

interface BoreHoleProps {
	index: number;
	status: number;
	value: number;
	delay?: number | null;
	coords: number[];
	zoom: number;
	selectedBoreHole?: number | null;
	boreHoleClick: (coords: number[]) => void;
}

const BoreHole: React.FC<BoreHoleProps> = ({
	index,
	coords,
	status,
	value,
	delay,
	zoom,
	selectedBoreHole,
	boreHoleClick,
}) => {
	const commonCSS = `border
		rounded-2xl
		m-[2px]
		flex
		items-center
		justify-center
		p-2
		cursor-pointer
		${
			selectedBoreHole === index
				? `text-red-200 bg-red-700`
				: status === 9
				? `bg-indigo-500 text-white hover:text-red-200 hover:bg-red-700`
				: status === 10
				? `bg-slate-500 hover:text-red-200 hover:bg-red-700`
				: `hover:text-red-200 hover:bg-red-700 bg-transparent`
		}
		${status === 8 ? `border-neutral-500 border-1` : `border-neutral-500 border-2`}
		}
		
		`;

	const handleClick = () => {
		boreHoleClick([coords[0], coords[1], index]);
	};

	let size = "text-xs min-w-10 min-h-10";

	if (zoom === 2) {
		size = "text-sm min-w-14 min-h-14";
	} else if (zoom === 3) {
		size = "text-base min-w-20 min-h-20";
	} else if (zoom === 4) {
		size = "text-lg min-w-24 min-h-24";
	} else if (zoom === 5) {
		size = "text-xl min-w-28 min-h-28";
	} else if (zoom === 6) {
		size = "text-2xl min-w-36 min-h-36";
	}

	return (
		<div onClick={handleClick} className={`${commonCSS} ${size}`}>
			<div className="relative">
				<div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
					{status === 9 ? (
						<p className="font-bold">{"E"}</p>
					) : status === 10 ? (
						<>{delay}</>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default BoreHole;
