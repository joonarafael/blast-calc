"use client";

export default function parseSaveCode(saveCode: string) {
	const saveArray = saveCode.split("-");

	const [width, height] = saveArray[0][0].split("!");

	const fieldStatus: number[][] = Array.from(
		{ length: parseInt(height, 10) },
		() => Array(parseInt(width, 10)).fill(0)
	);
	const fieldValues: number[][] = Array.from(
		{ length: parseInt(height, 10) },
		() => Array(parseInt(width, 10)).fill(0)
	);

	for (let i = 1; i < saveArray.length; i++) {
		const [position, status, value] = saveArray[i][0].split("!");
		const row = Math.floor(parseInt(position, 10) / parseInt(width, 10));
		const col = parseInt(position, 10) % parseInt(width, 10);

		fieldStatus[row][col] = parseInt(status, 10);
		fieldValues[row][col] = parseInt(value, 10);
	}

	return {
		width: parseInt(width, 10),
		height: parseInt(height, 10),
		fieldStatus,
		fieldValues,
	};
}
