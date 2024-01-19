"use client";

type Edge = {
	node: number;
	weight: number;
};

export default class Graph {
	private nodes: number;
	private graph: Map<number, Edge[]>;

	constructor(N: number) {
		this.nodes = N;
		this.graph = new Map();
	}

	addEdge(a: number, b: number, w: number): void {
		if (!this.graph.has(a)) {
			this.graph.set(a, []);
		}
		if (!this.graph.has(b)) {
			this.graph.set(b, []);
		}

		this.graph.get(a)!.push({ node: b, weight: w });
		this.graph.get(b)!.push({ node: a, weight: w });
	}
}
