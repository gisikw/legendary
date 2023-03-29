import { Visitor } from "../visitor";
import { ASTNode } from "../astNode";
import { HexCoord, HexIcon, HexLabel, PathLabel } from "../nodes";

export class RenderableTransformer extends Visitor {
	visitHexDefinition(node: ASTNode) {
		if (!node.children.renderables) node.children.renderables = [];
		const renderables = node.children.renderables as ASTNode[];
		renderables.push(
			new HexCoord({ primitives: { text: node.primitives.coordinates } })
		);
		if (node.primitives.icon) {
			renderables.push(
				new HexIcon({ primitives: { name: node.primitives.icon } })
			);
			delete node.primitives.icon;
		}
		if (node.primitives.label) {
			renderables.push(
				new HexLabel({ primitives: { name: node.primitives.label } })
			);
			delete node.primitives.label;
		}
	}

	visitPathDefinition(node: ASTNode) {
		if (!node.primitives.label) return;
		if (!node.children.renderables) node.children.renderables = [];
		(node.children.renderables as ASTNode[]).push(
			new PathLabel({ primitives: { text: node.primitives.label } })
		);
		delete node.primitives.label;
	}
}
