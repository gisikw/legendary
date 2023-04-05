import { Visitor } from "../visitor.js";
import type { ASTNode } from "../astNode.js";

const DEFAULT_CONFIG = {
	size: 500,
	orientation: "flat-top",
};

export class MetadataTransformer extends Visitor {
	public config: Record<string, any>;

	constructor(ast: ASTNode) {
		super(ast);
		this.config = Object.assign({}, DEFAULT_CONFIG);
	}

	override visitMetadata(node: ASTNode): void {
		Object.assign(this.config, {
			[node.primitives["key"]]: node.primitives["value"],
		});
		this.removeNode(node);
	}
}
