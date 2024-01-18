"use client";

export default function getColIndex(index: number, width: number) {
	const rows = Math.floor(index / width);

	return index - rows * width;
}
