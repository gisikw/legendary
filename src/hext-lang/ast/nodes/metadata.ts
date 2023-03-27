import { ASTNode } from "../astNode";
import type { Visitor } from "../visitor";

export class Metadata extends ASTNode {
	accept(visitor: Visitor): void {
		visitor.visitMetadata(this);
	}
}
