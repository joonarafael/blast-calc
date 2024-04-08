"use client";

export default function replaceOldEntry(
	fieldStatus: number[][],
	setFieldStatus: (arr: number[][]) => void,
	oldEntryValue?: number | null
) {
	let tmp = [...fieldStatus];

	let rowIndex, columnIndex;

	outerLoop: for (let i = 0; i < tmp.length; i++) {
		for (let j = 0; j < tmp[i].length; j++) {
			if (tmp[i][j] === 9) {
				rowIndex = i;
				columnIndex = j;
				break outerLoop;
			}
		}
	}

	if (rowIndex !== undefined && columnIndex !== undefined) {
		if (oldEntryValue) {
			tmp[rowIndex][columnIndex] = oldEntryValue;
		} else {
			tmp[rowIndex][columnIndex] = 8;
		}
	}

	setFieldStatus(tmp);
}
