import { HextLexer } from "../../../HextLexer";
import { HextParser } from "../../../HextParser";
import { PathHexTransformer } from "../pathHexTransformer";
import {
	Hextmap,
	Statement,
	Metadata,
	HexDefinition,
	PathDefinition,
} from "../../nodes";

test("enhance PathDefinition nodes by pathfinding between waypoint coordinates", () => {
	const map = `0000-0001 road`;
	const lexer = new HextLexer(map);
	const tokens = lexer.tokenize();
	const parser = new HextParser(tokens);
	const ast = parser.parse();
	const transformer = new PathHexTransformer(ast);
	transformer.process();
	expect(ast).toEqual(
		new Hextmap({
			children: {
				statements: [
					new PathDefinition({
						children: {
							hexSequence: [
								new HexDefinition({
									primitives: { coordinates: "0000" },
								}),
								new HexDefinition({
									primitives: { coordinates: "0001" },
								}),
							],
						},
						primitives: { pathType: "road" },
					}),
				],
			},
		})
	);
});
