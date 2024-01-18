"use client";

export default function getRowIndex(index: number, width: number) {
	return Math.floor(index / width);
}
