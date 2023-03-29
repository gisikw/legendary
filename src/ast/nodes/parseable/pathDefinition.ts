import { ASTNode } from "../../astNode";
import type { Visitor } from "../../visitor";

export class PathDefinition extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitPathDefinition(this);
	}
}
