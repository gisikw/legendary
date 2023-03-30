import { ASTNode } from "../../astNode.js";
import type { Visitor } from "../../visitor.js";

export class Hexmap extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitHexmap(this);
	}
}
