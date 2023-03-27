import { Visitor } from "../visitor";
import { ASTNode } from "../astNode";

export class PathfindingTransformer extends Visitor {
	public orientation: string;

	constructor(ast: ASTNode, orientation: string = "flat-top") {
		super(ast);
		this.orientation = orientation;
	}

	visitPathDefinition(node: ASTNode) {
		const { coordinates } = node.primitives;
		const fullPath: string[] = [coordinates[0]];

		for (let i = 0; i < coordinates.length - 1; i++) {
			fullPath.push(
				...this.findShortestPath(coordinates[i], coordinates[i + 1])
			);
		}

		node.primitives.coordinates = fullPath;
	}

	findShortestPath(start: string, goal: string): string[] {
		const startHex = new Hex(start);
		const goalHex = new Hex(goal);

		const openSet: Hex[] = [startHex];
		const cameFrom = new Map<string, Hex>();
		const gScore = new Map<string, number>();
		const fScore = new Map<string, number>();

		gScore.set(start, 0);
		fScore.set(start, startHex.distance(goalHex));

		while (openSet.length > 0) {
			let current = openSet.reduce((lowestF, hex) =>
				fScore.get(hex.coord())! < fScore.get(lowestF.coord())!
					? hex
					: lowestF
			);

			if (current.equals(goalHex)) {
				const path: string[] = [];
				let currentKey = current.coord();
				while (cameFrom.has(currentKey)) {
					path.unshift(currentKey);
					current = cameFrom.get(currentKey)!;
					currentKey = current.coord();
				}
				return path;
			}

			openSet.splice(openSet.indexOf(current), 1);

			current.neighbors().forEach((neighbor) => {
				const neighborKey = neighbor.coord();
				const currentKey = current.coord();
				const tentative_gScore = gScore.get(currentKey)! + 1;
				if (tentative_gScore < (gScore.get(neighborKey) ?? Infinity)) {
					cameFrom.set(neighborKey, current);
					gScore.set(neighborKey, tentative_gScore);
					fScore.set(
						neighborKey,
						tentative_gScore + neighbor.distance(goalHex)
					);

					if (!openSet.some((hex) => hex.equals(neighbor))) {
						openSet.push(neighbor);
					}
				}
			});
		}

		// Path not found
		return [];
	}
}

const AXIAL_DIRECTION_VECTORS = [
	[1, 0],
	[1, -1],
	[0, -1],
	[-1, 0],
	[-1, 1],
	[0, 1],
];

// Assuming odd-q layout
class Hex {
	q: number;
	r: number;
	s: number;

	constructor(coordinate: string = "0000") {
		const col = parseInt(coordinate.slice(0, 2));
		const row = parseInt(coordinate.slice(2, 4));
		this.q = col;
		this.r = row - Math.floor(col / 2);
	}

	col() {
		return this.q;
	}

	row() {
		return this.r + Math.floor(this.q / 2);
	}

	coord() {
		return (
			this.col().toString().padStart(2, "0") +
			this.row().toString().padStart(2, "0")
		);
	}

	neighbors() {
		const result = [];
		for (let i = 0; i < AXIAL_DIRECTION_VECTORS.length; i++) {
			const h = new Hex();
			h.q = this.q + AXIAL_DIRECTION_VECTORS[i][0];
			h.r = this.r + AXIAL_DIRECTION_VECTORS[i][1];
			if (h.row() > -1 && h.col() > -1) result.push(h);
		}
		return result;
	}

	distance(other: Hex): number {
		return (
			(Math.abs(this.q - other.q) +
				Math.abs(this.q + this.r - other.q - other.r) +
				Math.abs(this.r - other.r)) /
			2
		);
	}

	equals(other: Hex): boolean {
		return this.q === other.q && this.r === other.r;
	}
}
