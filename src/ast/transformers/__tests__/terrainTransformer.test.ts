import { Lexer } from "../../../lexer";
import { Parser } from "../../../parser";
import { TerrainTransformer } from "../terrainTransformer";
import { Hexmap, HexDefinition } from "../../nodes";

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
							bgColor: "#0000ff",
						},
					}),
				],
			},
		})
	);
});
