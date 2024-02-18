"use client";

type AdjacencyList = Record<number, { neighbor: number; weight: number }[]>;
type ShortestPaths = Record<number, { distance: number; path: number[] }>;

export default function dijkstra(
	adjacencyList: AdjacencyList,
	startNode: number
): ShortestPaths {
	const distances: Record<number, number> = {};
	const paths: Record<number, number[]> = {};
	const visited: Record<number, boolean> = {};

	// Initialize distances and paths
	for (const node in adjacencyList) {
		distances[node] = Infinity;
		paths[node] = [];
		visited[node] = false;
	}

	distances[startNode] = 0;

	// Priority queue based on distances
	const priorityQueue: number[] = [startNode];

	while (priorityQueue.length > 0) {
		const currentNode = priorityQueue.shift() as number;

		visited[currentNode] = true;

		for (const { neighbor, weight } of adjacencyList[currentNode]) {
			const newDistance = distances[currentNode] + weight;

			if (newDistance < distances[neighbor]) {
				distances[neighbor] = newDistance;
				paths[neighbor] = [...paths[currentNode], currentNode];

				if (!visited[neighbor]) {
					priorityQueue.push(neighbor);
					priorityQueue.sort((a, b) => distances[a] - distances[b]);
				}
			}
		}
	}

	const result: ShortestPaths = {};

	for (const node in distances) {
		if (distances[node] !== Infinity) {
			result[node] = {
				distance: distances[node],
				path: paths[node].concat(+node),
			};
		}
	}

	return result;
}
