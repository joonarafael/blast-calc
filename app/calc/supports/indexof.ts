"use client";

export default function twoDimIndexOf(
	twoDimensionalArray: number[][],
	searchValue: number
): number {
	const colCount = twoDimensionalArray[0].length;

	const getIndex = (row: number, col: number): number => row * colCount + col;

	for (let i = 0; i < twoDimensionalArray.length; i++) {
		for (let j = 0; j < twoDimensionalArray[i].length; j++) {
			if (twoDimensionalArray[i][j] === searchValue) {
				return getIndex(i, j);
			}
		}
	}

	return -1;
}
