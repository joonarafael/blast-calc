"use client";

import removeUnconnectedBorehole from "./removeunconnectedborehole";

// give borehole coordinates as the "original" argument
// removes all connections to or from this borehole

export default function checkUnconnectedBoreholes(
	original: number[],
	fieldValues: number[][],
	updateFieldValue: (coords: number[], value: number) => void,
	updateFieldStatus: (coords: number[], value: number) => void
) {
	// check north
	removeUnconnectedBorehole(
		[original[0] - 2, original[1]],
		fieldValues,
		updateFieldValue,
		updateFieldStatus
	);

	// check east
	removeUnconnectedBorehole(
		[original[0], original[1] + 2],
		fieldValues,
		updateFieldValue,
		updateFieldStatus
	);

	// check south
	removeUnconnectedBorehole(
		[original[0] + 2, original[1]],
		fieldValues,
		updateFieldValue,
		updateFieldStatus
	);

	// check west
	removeUnconnectedBorehole(
		[original[0], original[1] - 2],
		fieldValues,
		updateFieldValue,
		updateFieldStatus
	);

	// check northeast
	removeUnconnectedBorehole(
		[original[0] - 2, original[1] + 2],
		fieldValues,
		updateFieldValue,
		updateFieldStatus
	);

	// check southeast
	removeUnconnectedBorehole(
		[original[0] + 2, original[1] + 2],
		fieldValues,
		updateFieldValue,
		updateFieldStatus
	);

	// check southwest
	removeUnconnectedBorehole(
		[original[0] + 2, original[1] - 2],
		fieldValues,
		updateFieldValue,
		updateFieldStatus
	);

	// check northwest
	removeUnconnectedBorehole(
		[original[0] - 2, original[1] - 2],
		fieldValues,
		updateFieldValue,
		updateFieldStatus
	);
}
