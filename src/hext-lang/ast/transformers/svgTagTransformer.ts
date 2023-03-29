import { Visitor } from "../visitor";
import { ASTNode } from "../astNode";

export class SVGTagTransformer extends Visitor {
	visitHextmap(node: ASTNode) {
		const padding = this.options.padding || 10;
		const { minX, maxX, minY, maxY } = node.primitives;
		const width = maxX - minX;
		const height = maxY - minY;
		const viewBox = `viewBox="${minX - padding} ${minY - padding} ${
			width + 2 * padding
		} ${height + 2 * padding}"`;
		node.primitives.svgPre = `<svg xmlns="http://www.w3.org/2000/svg" ${viewBox}>`;
		node.primitives.svgPost = "</svg>";
		delete node.primitives.minX;
		delete node.primitives.maxX;
		delete node.primitives.minY;
		delete node.primitives.maxY;
		this.visitChildren(node);
	}

	visitHexDefinition(node: ASTNode) {
		const { bgColor } = node.primitives;
		const points = (
			node.children.hexGeometry as ASTNode
		).primitives.vertices
			.map((vertex: Record<string, number>) => {
				return `${vertex.x},${vertex.y}`;
			})
			.join(" ");

		const polygon = `<polygon fill="${node.primitives.bgColor}" points="${points}" stroke="black" stroke-width="2" />`;
		node.primitives.svgPre = polygon;

		delete node.primitives.bgColor;
		delete node.children.hexGeometry;
	}
}
