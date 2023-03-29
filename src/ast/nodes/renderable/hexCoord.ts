import { ASTNode } from "../../astNode";
import type { Visitor } from "../../visitor";

export class HexCoord extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitHexCoord(this);
	}
}
