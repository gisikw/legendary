import { ASTNode } from "../../astNode";
import type { Visitor } from "../../visitor";

export class HexDefinition extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitHexDefinition(this);
	}
}
