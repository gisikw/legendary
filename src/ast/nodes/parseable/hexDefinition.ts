import { ASTNode } from "../../astNode.js";
import type { Visitor } from "../../visitor.js";

export class HexDefinition extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitHexDefinition(this);
	}
}
