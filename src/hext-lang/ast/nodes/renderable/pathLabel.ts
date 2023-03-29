import { ASTNode } from "../../astNode";
import type { Visitor } from "../../visitor";

export class PathLabel extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitPathLabel(this);
	}
}
