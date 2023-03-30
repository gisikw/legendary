import { Visitor } from "../visitor.js";
import { ASTNode } from "../astNode.js";
import { HexCoord, HexIcon, HexLabel, PathLabel } from "../nodes/index.js";

export class RenderableTransformer extends Visitor {
	override visitHexDefinition(node: ASTNode) {
		if (!node.children["renderables"]) node.children["renderables"] = [];
		const renderables = node.children["renderables"] as ASTNode[];
		renderables.push(
			new HexCoord({
				primitives: { text: node.primitives["coordinates"] },
			})
		);
		if (node.primitives["icon"]) {
			renderables.push(
				new HexIcon({ primitives: { name: node.primitives["icon"] } })
			);
			delete node.primitives["icon"];
		}
		if (node.primitives["label"]) {
			renderables.push(
				new HexLabel({ primitives: { text: node.primitives["label"] } })
			);
			delete node.primitives["label"];
		}
	}

	override visitPathDefinition(node: ASTNode) {
		if (!node.primitives["label"]) return;
		if (!node.children["renderables"]) node.children["renderables"] = [];
		(node.children["renderables"] as ASTNode[]).push(
			new PathLabel({ primitives: { text: node.primitives["label"] } })
		);
		delete node.primitives["label"];
	}
}
