import { ASTNode } from "../../astNode";
import type { Visitor } from "../../visitor";

export class Hextmap extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitHextmap(this);
	}
}
