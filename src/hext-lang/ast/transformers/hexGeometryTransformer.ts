import { Visitor } from "../visitor";
import { ASTNode } from "../astNode";
import { HexGeometry } from "../nodes";

export class HexGeometryTransformer extends Visitor {
	override visitPathDefinition(node: ASTNode) {
		node.children['hexGeometries'] = node.primitives['coordinates'].map(
			HexGeometry.fromCoord
		);
		delete node.primitives['coordinates'];
	}

	override visitHexDefinition(node: ASTNode) {
		node.children['hexGeometry'] = HexGeometry.fromCoord(
			node.primitives['coordinates']
		);
		delete node.primitives['coordinates'];
	}
}
