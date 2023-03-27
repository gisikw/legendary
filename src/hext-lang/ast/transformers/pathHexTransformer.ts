import { Visitor } from "../visitor";
import { ASTNode } from "../astNode";
import { HexDefinition } from "../nodes";

export class PathHexTransformer extends Visitor {
	visitPathDefinition(node: ASTNode) {
		node.children.hexSequence = node.primitives.coordinates.map(
			(coordinates: string) =>
				new HexDefinition({ primitives: { coordinates } })
		);
		delete node.primitives.coordinates;
	}
}
