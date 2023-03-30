import { Generator } from "../generator.js";
import { ASTNode } from "../astNode.js";

export class SVGGenerator extends Generator {
	override visit(node: ASTNode) {
		this.append(node.primitives["svgPre"]);
		this.visitChildren(node);
		this.append(node.primitives["svgPost"]);
	}
}
