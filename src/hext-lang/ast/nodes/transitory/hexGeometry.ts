import { ASTNode } from "../../astNode";
import type { Visitor } from "../../visitor";

interface HexGeometryPrimitives {
	coord: string;
	row: number;
	col: number;
	q: number;
	r: number;
	[key: string]: any;
}

interface HexGeometryNodeOptions {
	children?: Record<string, ASTNode | ASTNode[]>;
	primitives: HexGeometryPrimitives;
}

export class HexGeometry extends ASTNode {
	primitives: HexGeometryPrimitives;

	constructor(options: HexGeometryNodeOptions) {
		super(options);
	}

	// Assuming odd-q layout
	static fromCoord(coord: string): HexGeometry {
		const col = parseInt(coord.slice(0, 2));
		const row = parseInt(coord.slice(2, 4));
		const q = col;
		const r = row - Math.floor(col / 2);
		return new HexGeometry({ primitives: { coord, col, row, q, r } });
	}

	static fromAxial(q: number, r: number): HexGeometry {
		const col = q;
		const row = r + (q - (q & 1)) / 2;
		const coord =
			col.toString().padStart(2, "0") + row.toString().padStart(2, "0");
		return new HexGeometry({ primitives: { coord, col, row, q, r } });
	}

	accept(visitor: Visitor): void {
		visitor.visitHexGeometry(this);
	}
}
