import { Visitor } from "../visitor.js";
import { ASTNode } from "../astNode.js";

export class MetadataTransformer extends Visitor {
	public metadata: Record<string, string>;

	constructor(ast: ASTNode) {
		super(ast);
		this.metadata = {};
	}

	override visitMetadata(node: ASTNode) {
		Object.assign(this.metadata, {
			[node.primitives["key"]]: node.primitives["value"],
		});
		this.removeNode(node);
	}
}
