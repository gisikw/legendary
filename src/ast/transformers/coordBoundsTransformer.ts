import { Visitor } from "../visitor.js";
import type { ASTNode } from "../astNode.js";

export class CoordBoundsTransformer extends Visitor {
	private minX: number;
	private maxX: number;
	private minY: number;
	private maxY: number;

	constructor(ast: ASTNode) {
		super(ast);
		this.minX = Infinity;
		this.maxX = -Infinity;
		this.minY = Infinity;
		this.maxY = -Infinity;
	}

	override visitHexmap(node: ASTNode): void {
		this.visitChildren(node);
		Object.assign(node.primitives, {
			minX: this.minX,
			maxX: this.maxX,
			minY: this.minY,
			maxY: this.maxY,
		});
	}

	override visitHexGeometry(node: ASTNode): void {
		node.primitives["vertices"].forEach(
			(vertex: Record<string, number>) => {
				if (vertex["x"] != null && vertex["x"] > this.maxX)
					this.maxX = vertex["x"];
				if (vertex["x"] != null && vertex["x"] < this.minX)
					this.minX = vertex["x"];
				if (vertex["y"] != null && vertex["y"] > this.maxY)
					this.maxY = vertex["y"];
				if (vertex["y"] != null && vertex["y"] < this.minY)
					this.minY = vertex["y"];
			}
		);
	}
}
