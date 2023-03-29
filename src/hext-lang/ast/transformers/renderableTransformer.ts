import { Visitor } from "../visitor";
import { ASTNode } from "../astNode";
import { HexCoord, HexIcon, HexLabel, PathLabel } from "../nodes";

export class RenderableTransformer extends Visitor {
	visitHexDefinition(node: ASTNode) {
		if (!node.children.renderables) node.children.renderables = [];
		(node.children.renderables as ASTNode[]).push(
			...[
				new HexCoord({
					primitives: { text: node.primitives.coordinates },
				}),
				new HexIcon({ primitives: { name: node.primitives.icon } }),
				new HexLabel({ primitives: { text: node.primitives.label } }),
			]
		);
		delete node.primitives.icon;
		delete node.primitives.label;
	}

	visitPathDefinition(node: ASTNode) {
		if (!node.children.renderables) node.children.renderables = [];
		(node.children.renderables as ASTNode[]).push(
			new PathLabel({ primitives: { text: node.primitives.label } })
		);
		delete node.primitives.label;
	}
}
