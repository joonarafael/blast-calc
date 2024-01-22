"use client";

import getColIndex from '../getcolindex';
import getRowIndex from '../getrowindex';

export default function connectEast(
	start: number,
	width: number,
	updateFieldStatus: (coords: number[], newValue: number) => void,
	updateFieldValue: (coords: number[], newValue: number) => void,
	tool: string
) {
	const targetIndex = start + 1;

	const targetIndexRow = getRowIndex(targetIndex, width);
	const targetIndexCol = getColIndex(targetIndex, width);

	updateFieldValue([targetIndexRow, targetIndexCol], 2);

	if (tool === "0") {
		updateFieldStatus([targetIndexRow, targetIndexCol], 65535);
	} else {
		updateFieldStatus([targetIndexRow, targetIndexCol], parseInt(tool, 10));
	}
}
