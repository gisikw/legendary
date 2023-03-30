import { ASTNode } from "../../astNode.js";
import type { Visitor } from "../../visitor.js";

export class HexLabel extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitHexLabel(this);
	}
}
