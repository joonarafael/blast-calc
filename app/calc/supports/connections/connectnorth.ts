"use client";

import getColIndex from "../getcolindex";
import getRowIndex from "../getrowindex";

export default function connectNorth(
	start: number,
	width: number,
	updateFieldStatus: (coords: number[], newValue: number) => void,
	updateFieldValue: (coords: number[], newValue: number) => void,
	tool: string
) {
	const targetIndex = start - width;

	const targetIndexRow = getRowIndex(targetIndex, width);
	const targetIndexCol = getColIndex(targetIndex, width);

	updateFieldStatus([targetIndexRow, targetIndexCol], 0);
	if (tool === "0") {
		updateFieldValue([targetIndexRow, targetIndexCol], 65535);
	} else {
		updateFieldValue([targetIndexRow, targetIndexCol], parseInt(tool, 10));
	}
}
