"use client";

function leadingZeros(num: string, size: number) {
	let s = "0000000000000000" + num;
	return s.substring(s.length - size);
}

export default function generateSaveCode(
	width: number,
	fieldStatus: number[][],
	fieldValues: number[][]
) {
	return;
}
