"use client";

export default function generateSaveCode(
	width: number,
	height: number,
	fieldStatus: number[][],
	fieldValues: number[][]
) {
	let saveArray: (string | number)[][] = [[width, height, ";"]];

	for (let i = 0; i < fieldStatus.length; i++) {
		for (let j = 0; j < fieldStatus[i].length; j++) {
			if (fieldStatus[i][j] !== 0 || fieldValues[i][j] !== 0) {
				saveArray.push([
					i * width + j,
					fieldStatus[i][j],
					fieldValues[i][j],
					";",
				]);
			}
		}
	}

	let saveCode = saveArray.toString();
	saveCode = saveCode.replaceAll(",;,", "-");
	saveCode = saveCode.replaceAll(",;", "");
	saveCode = saveCode.replaceAll(",", "!");

	window.open(`/calc/savecode/${saveCode}`, "_blank", "width=740,height=800");
}
