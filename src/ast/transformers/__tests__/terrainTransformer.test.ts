import { Lexer } from "../../../lexer.js";
import { Parser } from "../../../parser.js";
import { TerrainTransformer } from "../terrainTransformer.js";
import { Hexmap, HexDefinition } from "../../nodes/index.js";

test("replaces terrain strings with primitives for rendering", () => {
	const map = "0202 water";
	const lexer = new Lexer(map);
	const tokens = lexer.tokenize();
	const parser = new Parser(tokens);
	const ast = parser.parse();
	const transformer = new TerrainTransformer(ast);
	transformer.process();
	expect(ast).toEqual(
		new Hexmap({
			children: {
				statements: [
					new HexDefinition({
						primitives: {
							coordinates: "0202",
							bgColor: "#91bb99",
						},
					}),
				],
			},
		})
	);
});
