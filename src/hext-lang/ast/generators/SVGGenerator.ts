import { Generator } from "../generator";
import { ASTNode } from "../astNode";

export class SVGGenerator extends Generator {
	visit(node: ASTNode) {
		this.append(node.primitives.svgPre);
		this.visitChildren(node);
		this.append(node.primitives.svgPost);
	}
}
