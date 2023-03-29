import { ASTNode } from "../../astNode";
import type { Visitor } from "../../visitor";

export class HexLabel extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitHexLabel(this);
	}
}
