import { ASTNode } from "../../astNode.js";
import type { Visitor } from "../../visitor.js";

export class Metadata extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitMetadata(this);
	}
}
