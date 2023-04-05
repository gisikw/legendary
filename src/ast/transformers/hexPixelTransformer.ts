import { Visitor } from "../visitor.js";
import type { ASTNode } from "../astNode.js";

export class HexPixelTransformer extends Visitor {
	override visitHexGeometry(node: ASTNode): void {
		if (this.options["orientation"] === "pointy-top") {
			this.processPointyTop(node);
		} else {
			this.processFlatTop(node);
		}
	}

	processFlatTop(node: ASTNode): void {
		const { size } = this.options;
		const { q, r } = node.primitives;
		const sqrt3 = 3 ** 0.5;
		const x = size * ((3 / 2) * q);
		const y = size * ((sqrt3 / 2) * q + sqrt3 * r);
		node.primitives["origin"] = { x, y };
		node.primitives["vertices"] = [];
		for (let i = 0; i < 6; i++) {
			const angle = (Math.PI / 180) * (60 * i);
			node.primitives["vertices"].push({
				x: x + size * Math.cos(angle),
				y: y + size * Math.sin(angle),
			});
		}
	}

	processPointyTop(node: ASTNode): void {
		const { size } = this.options;
		const { q, r } = node.primitives;
		const sqrt3 = 3 ** 0.5;
		const x = size * (sqrt3 * q + (sqrt3 / 2) * r);
		const y = size * ((3 / 2) * r);
		node.primitives["origin"] = { x, y };
		node.primitives["vertices"] = [];
		for (let i = 0; i < 6; i++) {
			const angle = (Math.PI / 180) * (60 * i + 30);
			node.primitives["vertices"].push({
				x: x + size * Math.cos(angle),
				y: y + size * Math.sin(angle),
			});
		}
	}
}
