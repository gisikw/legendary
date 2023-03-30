import type { ASTNode } from "./astNode.js";

export abstract class Visitor {
	protected ast: ASTNode;
	protected options: Record<string, any>;
	private readonly parentNodeStack: ASTNode[] = [];

	static process(ast: ASTNode, options?: Record<string, any>): void {
		class Klass extends this {}
		const instance = new Klass(ast, options ?? {});
		instance.process();
	}

	constructor(ast: ASTNode, options?: Record<string, any>) {
		this.ast = ast;
		this.options = options ?? {};
	}

	process(): void {
		this.visit(this.ast);
	}

	visitHexCoord(node: ASTNode): void {
		this.visitChildren(node);
	}

	visitHexDefinition(node: ASTNode): void {
		this.visitChildren(node);
	}

	visitHexGeometry(node: ASTNode): void {
		this.visitChildren(node);
	}

	visitHexIcon(node: ASTNode): void {
		this.visitChildren(node);
	}

	visitHexLabel(node: ASTNode): void {
		this.visitChildren(node);
	}

	visitHexmap(node: ASTNode): void {
		this.visitChildren(node);
	}

	visitMetadata(node: ASTNode): void {
		this.visitChildren(node);
	}

	visitPathDefinition(node: ASTNode): void {
		this.visitChildren(node);
	}

	visitPathLabel(node: ASTNode): void {
		this.visitChildren(node);
	}

	protected getCurrentParent(): ASTNode | undefined {
		return this.parentNodeStack[this.parentNodeStack.length - 2];
	}

	protected pushParent(parent: ASTNode): void {
		this.parentNodeStack.push(parent);
	}

	protected popParent(): void {
		this.parentNodeStack.pop();
	}

	protected visit(node: ASTNode): void {
		this.pushParent(node);
		node.accept(this);
		this.popParent();
	}

	protected visitChildren(node: ASTNode): void {
		Object.values(node.children).flat().forEach(this.visit.bind(this));
	}

	protected removeNode(node: ASTNode): void {
		const parent = this.getCurrentParent();
		if (parent == null) return;
		for (const key in parent.children) {
			const childNodes = parent.children[key];
			if (Array.isArray(childNodes)) {
				const index = childNodes.indexOf(node);
				if (index > -1) {
					childNodes.splice(index, 1);
					break;
				}
			} else if (childNodes === node) {
				delete parent.children[key];
				break;
			}
		}
	}
}
