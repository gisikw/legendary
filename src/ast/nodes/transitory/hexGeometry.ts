import { ASTNode } from "../../astNode.js";
import type { Visitor } from "../../visitor.js";

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
	override primitives: HexGeometryPrimitives;

	constructor(options: HexGeometryNodeOptions) {
		super(options);
		this.primitives = options.primitives;
	}

	static fromCoord(
		coord: string,
		orientation: string = "flat-top"
	): HexGeometry {
		const col = parseInt(coord.slice(0, 2));
		const row = parseInt(coord.slice(2, 4));
		if (orientation === "flat-top") {
			const q = col;
			const r = row - (col - (col & 1)) / 2;
			return new HexGeometry({ primitives: { coord, col, row, q, r } });
		} else {
			const q = col - (row - (row & 1)) / 2;
			const r = row;
			return new HexGeometry({ primitives: { coord, col, row, q, r } });
		}
	}

	// TODO: Interpret this in the context of odd-q or odd-r layout too
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
