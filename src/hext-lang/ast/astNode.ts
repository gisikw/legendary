import type { Visitor } from "./visitor";

interface ASTNodeOptions {
	children?: Record<string, ASTNode | ASTNode[]>;
	primitives?: Record<string, any>;
}

export abstract class ASTNode {
	parent?: ASTNode;
	children: Record<string, ASTNode | ASTNode[]>;
	primitives: Record<string, any>;

	constructor(options: ASTNodeOptions = {}) {
		this.children = options.children || {};
		this.primitives = options.primitives || {};
	}

	abstract accept(visitor: Visitor): void;
}
