import { HextLexer } from "../../../HextLexer";
import { HextParser } from "../../../HextParser";
import { PathfindingTransformer } from "../pathfindingTransformer";
import {
	Hextmap,
	Statement,
	Metadata,
	HexDefinition,
	PathDefinition,
} from "../../nodes";

test("enhance PathDefinition nodes by pathfinding between waypoint coordinates", () => {
	const map = `0000-0301-0500 road`;
	const lexer = new HextLexer(map);
	const tokens = lexer.tokenize();
	const parser = new HextParser(tokens);
	const ast = parser.parse();
	const transformer = new PathfindingTransformer(ast, "flat-top");
	transformer.process();
	expect(ast).toEqual(
		new Hextmap({
			children: {
				statements: [
					new PathDefinition({
						primitives: {
							coordinates: [
								"0000",
								"0100",
								"0201",
								"0301",
								"0401",
								"0500",
							],
							pathType: "road",
						},
					}),
				],
			},
		})
	);
});
