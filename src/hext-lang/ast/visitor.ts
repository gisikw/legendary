import type {
	Hextmap,
	Metadata,
	HexDefinition,
	PathDefinition,
	HexGeometry,
} from "./nodes";
import { ASTNode } from "./astNode";

export abstract class Visitor {
	protected ast: ASTNode;
	private parentNodeStack: ASTNode[] = [];

	static process(ast: ASTNode) {
		class Klass extends this {}
		const instance = new Klass(ast);
		instance.process();
	}

	constructor(ast: ASTNode) {
		this.ast = ast;
	}

	process() {
		this.visit(this.ast);
	}

	visitHextmap(node: Hextmap): void {
		this.visitChildren(node);
	}

	visitMetadata(node: Metadata): void {
		this.visitChildren(node);
	}

	visitHexDefinition(node: HexDefinition): void {
		this.visitChildren(node);
	}

	visitPathDefinition(node: PathDefinition): void {
		this.visitChildren(node);
	}

	visitHexGeometry(node: HexGeometry): void {
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
		if (!parent) return;
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
