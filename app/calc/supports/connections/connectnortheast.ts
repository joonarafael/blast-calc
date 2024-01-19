"use client";

import getColIndex from '../getcolindex';
import getRowIndex from '../getrowindex';

export default function connectNorthEast(
	start: number,
	width: number,
	updateFieldStatus: (coords: number[], newValue: number) => void,
	updateFieldValue: (coords: number[], newValue: number) => void,
	tool: string
) {
	const targetIndex = start - width + 1;

	console.log(targetIndex);

	const targetIndexRow = getRowIndex(targetIndex, width);
	const targetIndexCol = getColIndex(targetIndex, width);

	console.log(targetIndexRow, targetIndexCol);

	updateFieldValue([targetIndexRow, targetIndexCol], 1);
	updateFieldStatus([targetIndexRow, targetIndexCol], parseInt(tool, 10));
}
