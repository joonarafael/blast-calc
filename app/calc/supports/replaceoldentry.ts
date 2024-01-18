export default function replaceOldEntry(
	fieldStatus: number[][],
	setFieldStatus: (arr: number[][]) => void
) {
	let tmp = [...fieldStatus];

	let rowIndex, columnIndex;

	outerLoop: for (let i = 0; i < tmp.length; i++) {
		for (let j = 0; j < tmp[i].length; j++) {
			if (tmp[i][j] === 0) {
				rowIndex = i;
				columnIndex = j;
				break outerLoop;
			}
		}
	}

	if (rowIndex !== undefined && columnIndex !== undefined) {
		tmp[rowIndex][columnIndex] = -1;
	}

	setFieldStatus(tmp);
}
