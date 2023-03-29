import { ASTNode } from "../../astNode";
import type { Visitor } from "../../visitor";

export class HexIcon extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitHexIcon(this);
	}
}
