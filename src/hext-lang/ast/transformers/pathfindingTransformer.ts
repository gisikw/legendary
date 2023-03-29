import { Visitor } from "../visitor";
import { ASTNode } from "../astNode";
import { HexGeometry } from "../nodes";

const AXIAL_DIRECTION_VECTORS: Array<Array<number>> = [
	[1, 0],
	[1, -1],
	[0, -1],
	[-1, 0],
	[-1, 1],
	[0, 1],
];

export class PathfindingTransformer extends Visitor {
	public orientation: string;

	constructor(ast: ASTNode, orientation: string = "flat-top") {
		super(ast);
		this.orientation = orientation;
	}

	override visitPathDefinition(node: ASTNode) {
		const hexGeometries = node.children['hexGeometries'] as HexGeometry[];
		const fullPath: HexGeometry[] = [];

		for (let i = 0; i < hexGeometries.length - 1; i++) {
			const hex = hexGeometries[i];
			const next = hexGeometries[i+1];
			if (hex && next) fullPath.push(...this.findShortestPath(hex, next));
		}
		const last = hexGeometries[hexGeometries.length - 1];
		if (last) fullPath.push(last);

		node.children['hexGeometries'] = fullPath;
	}

	findShortestPath(start: HexGeometry, goal: HexGeometry): HexGeometry[] {
		const openSet: HexGeometry[] = [start];
		const cameFrom = new Map<string, HexGeometry>();
		const gScore = new Map<string, number>();
		const fScore = new Map<string, number>();

		gScore.set(start.primitives.coord, 0);
		fScore.set(start.primitives.coord, this.distance(start, goal));

		while (openSet.length > 0) {
			let current = openSet.reduce((lowestF, hex) =>
				fScore.get(hex.primitives.coord)! <
				fScore.get(lowestF.primitives.coord)!
					? hex
					: lowestF
			);

			if (this.equals(current, goal)) {
				const path: HexGeometry[] = [];
				let currentKey = current.primitives.coord;
				while (cameFrom.has(currentKey)) {
					path.unshift(cameFrom.get(currentKey)!);
					current = cameFrom.get(currentKey)!;
					currentKey = current.primitives.coord;
				}
				return path;
			}

			openSet.splice(openSet.indexOf(current), 1);

			this.getNeighbors(current).forEach((neighbor) => {
				const neighborKey = neighbor.primitives.coord;
				const currentKey = current.primitives.coord;
				const tentative_gScore = gScore.get(currentKey)! + 1;
				if (tentative_gScore < (gScore.get(neighborKey) ?? Infinity)) {
					cameFrom.set(neighborKey, current);
					gScore.set(neighborKey, tentative_gScore);
					fScore.set(
						neighborKey,
						tentative_gScore + this.distance(neighbor, goal)
					);

					if (!openSet.some((hex) => this.equals(hex, neighbor))) {
						openSet.push(neighbor);
					}
				}
			});
		}

		// Path not found
		return [];
	}

	getNeighbors(hex: HexGeometry): HexGeometry[] {
		const result = [];
		for (const directionVector of AXIAL_DIRECTION_VECTORS) {
			const h = HexGeometry.fromAxial(
				hex.primitives.q + (directionVector[0] || 0),
				hex.primitives.r + (directionVector[1] || 0)
			);
			if (h.primitives.row > -1 && h.primitives.col > -1) result.push(h);
		}
		return result;
	}

	distance(hex1: HexGeometry, hex2: HexGeometry): number {
		return (
			(Math.abs(hex1.primitives.q - hex2.primitives.q) +
				Math.abs(
					hex1.primitives.q +
						hex1.primitives.r -
						hex2.primitives.q -
						hex2.primitives.r
				) +
				Math.abs(hex1.primitives.r - hex2.primitives.r)) /
			2
		);
	}

	equals(hex1: HexGeometry, hex2: HexGeometry): boolean {
		return (
			hex1.primitives.q === hex2.primitives.q &&
			hex1.primitives.r === hex2.primitives.r
		);
	}
}
