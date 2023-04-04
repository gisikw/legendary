import { Visitor } from "../visitor.js";
import type { ASTNode } from "../astNode.js";

export class SVGTagTransformer extends Visitor {
	override visitHexmap(node: ASTNode): void {
		const padding = this.options["padding"] ?? 10;
		const { minX, maxX, minY, maxY } = node.primitives;
		const width = maxX - minX;
		const height = maxY - minY;
		const viewBox = `viewBox="${minX - padding} ${minY - padding} ${
			width + 2 * padding
		} ${height + 2 * padding}"`;
		node.primitives[
			"svgPre"
		] = `<svg xmlns="http://www.w3.org/2000/svg" ${viewBox}>`;
		node.primitives["svgPost"] = "</svg>";
		delete node.primitives["minX"];
		delete node.primitives["maxX"];
		delete node.primitives["minY"];
		delete node.primitives["maxY"];
		this.visitChildren(node);
	}

	override visitHexDefinition(node: ASTNode): void {
		const bgColor: string = node.primitives["bgColor"];
		const points: string = (
			node.children["hexGeometry"] as ASTNode
		).primitives["vertices"]
			.map((vertex: Record<string, number>) => {
				return `${vertex["x"] ?? ""},${vertex["y"] ?? ""}`;
			})
			.join(" ");

		const polygon = `<polygon fill="${bgColor}" points="${points}" stroke="black" stroke-width="2" />`;
		node.primitives["svgPre"] = polygon;

		delete node.primitives["bgColor"];
		delete node.children["hexGeometry"];
		this.visitChildren(node);
	}

	override visitHexCoord(node: ASTNode): void {
		const x: number = node.primitives["x"];
		let y: number = node.primitives["y"];
		const size: number = node.primitives["size"];
		const text: string = node.primitives["text"];
		y = y - (4 / 6) * size;
		const fontSize: number = size / 6;
		const svgText = `<text alignment-baseline="middle" fill="black" font-size="${fontSize}" text-anchor="middle" x="${x}" y="${y}">${text}</text>`;
		node.primitives["svgPre"] = svgText;
	}
}
