import { ASTNode } from "../../astNode";
import type { Visitor } from "../../visitor";

export class Hexmap extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitHexmap(this);
	}
}
