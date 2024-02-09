"use client";

type AdjacencyList = Record<number, number[]>;

export default function generateAdjacencyList(
	fieldStatus: number[][],
	fieldValues: number[][]
): AdjacencyList {
	const colCount = fieldStatus[0].length;
	const rowCount = fieldStatus.length;

	const adjacencyList: AdjacencyList = {};

	const getIndex = (row: number, col: number): number => row * colCount + col;

	for (let row = 0; row < rowCount; row++) {
		if (row % 2 == 0) {
			for (let col = 0; col < colCount; col++) {
				if (col % 2 == 0) {
					if (fieldStatus[row][col] !== 0) {
						let neighbors = [];

						if (
							row >= 2 &&
							fieldStatus[row - 2][col] !== 0 &&
							fieldValues[row - 1][col] !== 0 &&
							fieldStatus[row - 1][col] == 0
						) {
							neighbors.push(getIndex(row - 2, col));
						}

						if (
							row >= 2 &&
							col <= colCount - 2 &&
							fieldStatus[row - 2][col + 2] !== 0 &&
							fieldValues[row - 1][col + 1] !== 0 &&
							fieldStatus[row - 1][col + 1] == 1
						) {
							neighbors.push(getIndex(row - 2, col + 2));
						}

						if (
							col <= colCount - 2 &&
							fieldStatus[row][col + 2] !== 0 &&
							fieldValues[row][col + 1] !== 0 &&
							fieldStatus[row][col + 1] == 2
						) {
							neighbors.push(getIndex(row, col + 2));
						}

						if (
							row <= rowCount - 2 &&
							col <= colCount - 2 &&
							fieldStatus[row + 2][col + 2] !== 0 &&
							fieldValues[row + 1][col + 1] !== 0 &&
							fieldStatus[row + 1][col + 1] == 3
						) {
							neighbors.push(getIndex(row + 2, col + 2));
						}

						if (
							row <= rowCount - 2 &&
							fieldStatus[row + 2][col] !== 0 &&
							fieldValues[row + 1][col] !== 0 &&
							fieldStatus[row + 1][col] == 4
						) {
							neighbors.push(getIndex(row + 2, col));
						}

						if (
							row <= rowCount - 2 &&
							col >= 2 &&
							fieldStatus[row + 2][col - 2] !== 0 &&
							fieldValues[row + 1][col - 1] !== 0 &&
							fieldStatus[row + 1][col - 1] == 5
						) {
							neighbors.push(getIndex(row + 2, col - 2));
						}

						if (
							col >= 2 &&
							fieldStatus[row][col - 2] !== 0 &&
							fieldValues[row][col - 1] !== 0 &&
							fieldStatus[row][col - 1] == 6
						) {
							neighbors.push(getIndex(row, col - 2));
						}

						if (
							row >= 2 &&
							col >= 2 &&
							fieldStatus[row - 2][col - 2] !== 0 &&
							fieldValues[row - 1][col - 1] !== 0 &&
							fieldStatus[row - 1][col - 1] == 7
						) {
							neighbors.push(getIndex(row - 2, col - 2));
						}

						adjacencyList[getIndex(row, col)] = neighbors;
					}
				}
			}
		}
	}

	// console.log(adjacencyList);
	return adjacencyList;
}
