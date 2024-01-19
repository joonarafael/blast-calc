"use client";

import connectEast from "./connections/connecteast";
import connectNorth from "./connections/connectnorth";
import connectNorthEast from "./connections/connectnortheast";
import connectNorthWest from "./connections/connectnorthwest";
import connectSouth from "./connections/connectsouth";
import connectSouthEast from "./connections/connectsoutheast";
import connectSouthWest from "./connections/connectsouthwest";
import connectWest from "./connections/connectwest";
import getColIndex from "./getcolindex";
import getRowIndex from "./getrowindex";

export default function initConnection(
	start: number,
	end: number,
	width: number,
	updateFieldStatus: (coords: number[], newValue: number) => void,
	updateFieldValue: (coords: number[], newValue: number) => void,
	tool: string
) {
	let success = true;

	if (start - end === width * 2) {
		connectNorth(start, width, updateFieldStatus, updateFieldValue, tool);
	} else if (end - start === width * 2) {
		connectSouth(start, width, updateFieldStatus, updateFieldValue, tool);
	} else if (start - end === 2) {
		connectWest(start, width, updateFieldStatus, updateFieldValue, tool);
	} else if (end - start === 2) {
		connectEast(start, width, updateFieldStatus, updateFieldValue, tool);
	} else if (start - end === width * 2 + 2) {
		connectNorthWest(start, width, updateFieldStatus, updateFieldValue, tool);
	} else if (start - end === width * 2 - 2) {
		connectNorthEast(start, width, updateFieldStatus, updateFieldValue, tool);
	} else if (end - start === width * 2 - 2) {
		connectSouthWest(start, width, updateFieldStatus, updateFieldValue, tool);
	} else if (end - start === width * 2 + 2) {
		connectSouthEast(start, width, updateFieldStatus, updateFieldValue, tool);
	} else {
		success = false;
	}

	if (success) {
		const startIndexRow = getRowIndex(start, width);
		const startIndexCol = getColIndex(start, width);

		updateFieldStatus([startIndexRow, startIndexCol], 2);

		const endIndexRow = getRowIndex(end, width);
		const endIndexCol = getColIndex(end, width);

		updateFieldStatus([endIndexRow, endIndexCol], 2);
	}
}
