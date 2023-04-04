import { Visitor } from "../visitor.js";
import type { ASTNode } from "../astNode.js";
import { HexCoord, HexIcon, HexLabel, PathLabel } from "../nodes/index.js";
import type { HexGeometry } from "../nodes/index.js";

export class RenderableTransformer extends Visitor {
	override visitHexDefinition(node: ASTNode): void {
		const hexGeometry = node.children["hexGeometry"] as HexGeometry;
		if (hexGeometry == null) return;
		const { q, r, coord } = hexGeometry.primitives;
		if (node.children["renderables"] == null)
			node.children["renderables"] = [];
		const renderables = node.children["renderables"] as ASTNode[];
		renderables.push(
			new HexCoord({
				primitives: {
					text: coord,
					q,
					r,
				},
			})
		);
		if (node.primitives["icon"] != null) {
			renderables.push(
				new HexIcon({
					primitives: {
						name: node.primitives["icon"],
						q,
						r,
					},
				})
			);
			delete node.primitives["icon"];
		}
		if (node.primitives["label"] != null) {
			renderables.push(
				new HexLabel({
					primitives: {
						text: node.primitives["label"],
						q,
						r,
					},
				})
			);
			delete node.primitives["label"];
		}
	}

	override visitPathDefinition(node: ASTNode): void {
		if (node.primitives["label"] == null) return;
		if (node.children["renderables"] == null)
			node.children["renderables"] = [];
		(node.children["renderables"] as ASTNode[]).push(
			new PathLabel({ primitives: { text: node.primitives["label"] } })
		);
		delete node.primitives["label"];
	}
}
