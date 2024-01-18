"use client";

import getColIndex from "../getcolindex";
import getRowIndex from "../getrowindex";

export default function connectNorthEast(
	start: number,
	end: number,
	width: number,
	updateFieldValue: (coords: number[], newValue: number) => void,
	tool: string
) {
	const targetIndex = start - width + 1;

	console.log(targetIndex);

	const targetIndexRow = getRowIndex(targetIndex, width);
	const targetIndexCol = getColIndex(targetIndex, width);

	console.log(targetIndexRow, targetIndexCol);

	updateFieldValue([targetIndexRow, targetIndexCol], parseInt(tool, 10));
}
