"use client";

import isBoreholeConnected from "./isboreholeconnected";

// give borehole coordinates as the "original" argument
// returns true if the borehole has at least one connection

export default function removeUnconnectedBorehole(
	original: number[],
	fieldValues: number[][],
	updateFieldValue: (coords: number[], value: number) => void,
	updateFieldStatus: (coords: number[], value: number) => void
) {
	const isConnected = isBoreholeConnected(original, fieldValues);

	if (!isConnected) {
		updateFieldValue(original, -1);
		updateFieldStatus(original, -1);
	}
}
