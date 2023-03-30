import { ASTNode } from "../../astNode.js";
import type { Visitor } from "../../visitor.js";

export class HexIcon extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitHexIcon(this);
	}
}
