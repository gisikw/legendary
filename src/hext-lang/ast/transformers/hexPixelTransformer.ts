import { Visitor } from "../visitor";
import { ASTNode } from "../astNode";

export class HexPixelTransformer extends Visitor {
	visitHexGeometry(node: ASTNode) {
		const { size } = this.options;
		const { q, r } = node.primitives;
		const x = size * ((3 / 2) * q);
		const y = size * ((3 ** 0.5 / 2) * q + 3 ** 0.5 * r);
		node.primitives.origin = { x, y };
		node.primitives.vertices = [];
		for (let i = 0; i < 6; i++) {
			const angle = (Math.PI / 180) * (60 * i);
			node.primitives.vertices.push({
				x: x + size * Math.cos(angle),
				y: y + size * Math.sin(angle),
			});
		}
	}
}
