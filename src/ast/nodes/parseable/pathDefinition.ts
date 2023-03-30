import { ASTNode } from "../../astNode.js";
import type { Visitor } from "../../visitor.js";

export class PathDefinition extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitPathDefinition(this);
	}
}
