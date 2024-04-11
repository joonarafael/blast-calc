"use client";

export default function analyzeMaster(
	delayMap: { borehole: number; delay: number }[]
) {
	delayMap.sort((a, b) => a.delay - b.delay);

	let delayCounts: number[] = [];
	let seen: number[] = [];

	for (let i = 0; i < delayMap.length; i++) {
		const element = delayMap[i];
		const delay = element.delay;

		const seenIndex = seen.indexOf(delay);

		if (seenIndex !== -1) {
			delayCounts[seenIndex]++;
		} else {
			delayCounts.push(1);
			seen.push(delay);
		}
	}

	let delayGraph: { delay: number; count: number }[] = [];

	for (let i = 0; i < seen.length; i++) {
		delayGraph.push({
			delay: seen[i],
			count: delayCounts[i],
		});
	}

	return delayGraph;
}
