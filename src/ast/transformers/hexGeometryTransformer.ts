import { Visitor } from "../visitor.js";
import type { ASTNode } from "../astNode.js";
import { HexGeometry } from "../nodes/index.js";

export class HexGeometryTransformer extends Visitor {
	override visitPathDefinition(node: ASTNode): void {
		node.children["hexGeometries"] = node.primitives["coordinates"].map(
			(coord: string) =>
				HexGeometry.fromCoord(coord, this.options["orientation"])
		);
		delete node.primitives["coordinates"];
	}

	override visitHexDefinition(node: ASTNode): void {
		node.children["hexGeometry"] = HexGeometry.fromCoord(
			node.primitives["coordinates"],
			this.options["orientation"]
		);
		delete node.primitives["coordinates"];
	}
}
