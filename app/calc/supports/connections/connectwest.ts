"use client";

import getColIndex from '../getcolindex';
import getRowIndex from '../getrowindex';

export default function connectWest(
	start: number,
	width: number,
	updateFieldStatus: (coords: number[], newValue: number) => void,
	updateFieldValue: (coords: number[], newValue: number) => void,
	tool: string
) {
	const targetIndex = start - 1;

	const targetIndexRow = getRowIndex(targetIndex, width);
	const targetIndexCol = getColIndex(targetIndex, width);

	updateFieldValue([targetIndexRow, targetIndexCol], 6);
	updateFieldStatus([targetIndexRow, targetIndexCol], parseInt(tool, 10));
}
