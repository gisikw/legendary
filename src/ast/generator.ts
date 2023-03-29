import { ASTNode } from "./astNode";
import { Visitor } from "./visitor";

export abstract class Generator extends Visitor {
	private output: string;

	static generate(ast: ASTNode, options?: Record<string, any>): string {
		class Klass extends this {}
		const instance = new Klass(ast, options || {});
		instance.process();
		return instance.output;
	}

	constructor(ast: ASTNode, options?: Record<string, any>) {
		super(ast, options || {});
		this.output = "";
	}

	append(addendum: string | null) {
		if (addendum) this.output = this.output + addendum;
	}
}
