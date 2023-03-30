import { ASTNode } from "../../astNode.js";
import type { Visitor } from "../../visitor.js";

export class PathLabel extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitPathLabel(this);
	}
}
