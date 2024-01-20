"use client";

// give borehole coordinates as the "original" argument
// returns true if the borehole has at least one connection

export default function isBoreholeConnected(
	original: number[],
	fieldValues: number[][]
) {
	console.log(original, fieldValues);
	// check north
	if (fieldValues[original[0] - 1] !== undefined) {
		const target = fieldValues[original[0] - 1][original[1]];
		if (target !== undefined && target !== -1) {
			return true;
		}
	}

	// check east
	let target = fieldValues[original[0]][original[1] + 1];
	if (target !== undefined && target !== -1) {
		return true;
	}

	// check south
	if (fieldValues[original[0] + 1] !== undefined) {
		const target = fieldValues[original[0] + 1][original[1]];
		if (target !== undefined && target !== -1) {
			return true;
		}
	}

	// check west
	target = fieldValues[original[0]][original[1] - 1];
	if (target !== undefined && target !== -1) {
		return true;
	}

	// check northeast
	if (fieldValues[original[0] - 1] !== undefined) {
		const target = fieldValues[original[0] - 1][original[1] + 1];
		if (target !== undefined && target !== -1) {
			if (target === 1 || target === 5) {
				return true;
			}
		}
	}

	// check southeast
	if (fieldValues[original[0] + 1] !== undefined) {
		const target = fieldValues[original[0] + 1][original[1] + 1];
		if (target !== undefined && target !== -1) {
			if (target === 3 || target === 7) {
				return true;
			}
		}
	}

	// check southwest
	if (fieldValues[original[0] + 1] !== undefined) {
		const target = fieldValues[original[0] + 1][original[1] - 1];
		if (target !== undefined && target !== -1) {
			if (target === 5 || target === 1) {
				return true;
			}
		}
	}

	// check northwest
	if (fieldValues[original[0] - 1] !== undefined) {
		const target = fieldValues[original[0] - 1][original[1] - 1];
		if (target !== undefined && target !== -1) {
			if (target === 7 || target === 3) {
				return true;
			}
		}
	}

	return false;
}
