"use client";

export default function replaceAllEqualTo(
	fieldValues: number[][],
	setFieldValues: (arr: number[][]) => void,
	toBeReplaced: number,
	replaceWith: number
) {
	let tmp = [...fieldValues];

	for (let i = 0; i < tmp.length; i++) {
		for (let j = 0; j < tmp[i].length; j++) {
			if (tmp[i][j] === toBeReplaced) {
				tmp[i][j] = replaceWith;
			}
		}
	}

	setFieldValues(tmp);
}
