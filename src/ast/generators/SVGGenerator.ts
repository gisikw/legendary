import { Generator } from "../generator.js";
import type { ASTNode } from "../astNode.js";

export class SVGGenerator extends Generator {
	override visit(node: ASTNode): void {
		this.append(node.primitives["svgPre"]);
		this.visitChildren(node);
		this.append(node.primitives["svgPost"]);
	}
}
