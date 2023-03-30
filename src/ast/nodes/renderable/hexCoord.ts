import { ASTNode } from "../../astNode.js";
import type { Visitor } from "../../visitor.js";

export class HexCoord extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitHexCoord(this);
	}
}
