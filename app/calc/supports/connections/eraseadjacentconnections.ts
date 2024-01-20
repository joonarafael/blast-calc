"use client";

// give borehole coordinates as the "original" argument
// removes all connections to or from this borehole

export default function eraseAdjacentConnections(
	original: number[],
	fieldValues: number[][],
	updateFieldValue: (coords: number[], value: number) => void,
	updateFieldStatus: (coords: number[], value: number) => void
) {
	// check north
	if (fieldValues[original[0] - 1] !== undefined) {
		const target = fieldValues[original[0] - 1][original[1]];
		if (target !== undefined) {
			updateFieldValue([original[0] - 1, original[1]], -1);
			updateFieldStatus([original[0] - 1, original[1]], -1);
		}
	}

	// check east
	let target = fieldValues[original[0]][original[1] + 1];
	if (target !== undefined) {
		updateFieldValue([original[0], original[1] + 1], -1);
		updateFieldStatus([original[0], original[1] + 1], -1);
	}

	// check south
	if (fieldValues[original[0] + 1] !== undefined) {
		const target = fieldValues[original[0] + 1][original[1]];
		if (target !== undefined) {
			updateFieldValue([original[0] + 1, original[1]], -1);
			updateFieldStatus([original[0] + 1, original[1]], -1);
		}
	}

	// check west
	target = fieldValues[original[0]][original[1] - 1];
	if (target !== undefined) {
		updateFieldValue([original[0], original[1] - 1], -1);
		updateFieldStatus([original[0], original[1] - 1], -1);
	}

	// check northeast
	if (fieldValues[original[0] - 1] !== undefined) {
		const target = fieldValues[original[0] - 1][original[1] + 1];
		if (target !== undefined) {
			if (target === 1 || target === 5) {
				updateFieldValue([original[0] - 1, original[1] + 1], -1);
				updateFieldStatus([original[0] - 1, original[1] + 1], -1);
			}
		}
	}

	// check southeast
	if (fieldValues[original[0] + 1] !== undefined) {
		const target = fieldValues[original[0] + 1][original[1] + 1];
		if (target !== undefined) {
			if (target === 3 || target === 7) {
				updateFieldValue([original[0] + 1, original[1] + 1], -1);
				updateFieldStatus([original[0] + 1, original[1] + 1], -1);
			}
		}
	}

	// check southwest
	if (fieldValues[original[0] + 1] !== undefined) {
		const target = fieldValues[original[0] + 1][original[1] - 1];
		if (target !== undefined) {
			if (target === 5 || target === 1) {
				updateFieldValue([original[0] + 1, original[1] - 1], -1);
				updateFieldStatus([original[0] + 1, original[1] - 1], -1);
			}
		}
	}

	// check northwest
	if (fieldValues[original[0] - 1] !== undefined) {
		const target = fieldValues[original[0] - 1][original[1] - 1];
		if (target !== undefined) {
			if (target === 3 || target === 7) {
				updateFieldValue([original[0] - 1, original[1] - 1], -1);
				updateFieldStatus([original[0] - 1, original[1] - 1], -1);
			}
		}
	}
}
