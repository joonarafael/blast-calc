"use client";

import { compressToEncodedURIComponent as lzStringCompress } from "lz-string";

function pad(num: string, size: number) {
	const s = "000000000" + num;
	return s.substring(s.length - size);
}

export default function generateSaveCode(
	width: number,
	height: number,
	fieldStatus: number[][],
	fieldValues: number[][]
) {
	let saveArray: (string | number)[][] = [
		[pad(width.toString(16), 2), pad(height.toString(16), 2)],
	];

	for (let i = 0; i < fieldStatus.length; i++) {
		for (let j = 0; j < fieldStatus[i].length; j++) {
			if (fieldStatus[i][j] !== 0 || fieldValues[i][j] !== 0) {
				saveArray.push([
					pad((i * width + j).toString(16), 4),
					pad(fieldStatus[i][j].toString(16), 4),
					pad(fieldValues[i][j].toString(16), 4),
				]);
			}
		}
	}

	let saveCode = saveArray.toString();
	saveCode = saveCode.replaceAll(",", "");

	const compressed = lzStringCompress(saveCode);

	console.log(compressed);
}
