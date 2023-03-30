import { Visitor } from "../visitor.js";
import type { ASTNode } from "../astNode.js";

const TERRAIN_DICTIONARY: Record<string, Record<string, string>> = {
	ocean: { bgColor: "#5ea48b" },
	water: { bgColor: "#91bb99" },
	swamp: { bgColor: "#5f5c24" },
	desert: { bgColor: "#dcd575" },
	plains: { bgColor: "#7ad317" },
	forest: { bgColor: "#417505" },
	hills: { bgColor: "#695010" },
	mountains: { bgColor: "#5b6748" },
};

const DEFAULT_ATTRIBUTES = {
	bgColor: "#cccccc",
};

export class TerrainTransformer extends Visitor {
	override visitHexDefinition(node: ASTNode): void {
		Object.assign(
			node.primitives,
			TERRAIN_DICTIONARY[node.primitives["terrain"]] ?? DEFAULT_ATTRIBUTES
		);
		delete node.primitives["terrain"];
	}
}
