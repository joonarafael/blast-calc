"use client";

import connectEast from "./connections/connecteast";
import connectNorth from "./connections/connectnorth";
import connectNorthEast from "./connections/connectnortheast";
import connectNorthWest from "./connections/connectnorthwest";
import connectSouth from "./connections/connectsouth";
import connectSouthEast from "./connections/connectsoutheast";
import connectSouthWest from "./connections/connectsouthwest";
import connectWest from "./connections/connectwest";

export default function initConnection(
	start: number,
	end: number,
	width: number,
	updateFieldValue: (coords: number[], newValue: number) => void,
	tool: string
) {
	console.log(
		"initConnection for " + start + ", " + end + ". Field width: " + width + "."
	);

	if (start - end === width * 2) {
		connectNorth(start, end, width, updateFieldValue, tool);
	} else if (end - start === width * 2) {
		connectSouth(start, end, width, updateFieldValue, tool);
	} else if (start - end === 2) {
		connectWest(start, end, width, updateFieldValue, tool);
	} else if (end - start === 2) {
		connectEast(start, end, width, updateFieldValue, tool);
	} else if (start - end === width * 2 + 2) {
		connectNorthWest(start, end, width, updateFieldValue, tool);
	} else if (start - end === width * 2 - 2) {
		connectNorthEast(start, end, width, updateFieldValue, tool);
	} else if (end - start === width * 2 - 2) {
		connectSouthWest(start, end, width, updateFieldValue, tool);
	} else if (end - start === width * 2 + 2) {
		connectSouthEast(start, end, width, updateFieldValue, tool);
	} else {
		console.log("Invalid selection for connection.");
	}
}
