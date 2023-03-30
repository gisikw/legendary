import { Visitor } from "../visitor.js";
import { ASTNode } from "../astNode.js";

const TERRAIN_DICTIONARY: Record<string, Record<string, string>> = {
	water: {
		bgColor: "#0000ff",
	},
};

const DEFAULT_ATTRIBUTES = {
	bgColor: "#cccccc",
};

export class TerrainTransformer extends Visitor {
	override visitHexDefinition(node: ASTNode) {
		Object.assign(
			node.primitives,
			TERRAIN_DICTIONARY[node.primitives["terrain"]] || DEFAULT_ATTRIBUTES
		);
		delete node.primitives["terrain"];
	}
}
