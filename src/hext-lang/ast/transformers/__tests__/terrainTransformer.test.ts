import { HextLexer } from "../../../hextLexer";
import { HextParser } from "../../../hextParser";
import { TerrainTransformer } from "../terrainTransformer";
import { Hextmap, HexDefinition } from "../../nodes";

test("replaces terrain strings with primitives for rendering", () => {
	const map = "0202 water";
	const lexer = new HextLexer(map);
	const tokens = lexer.tokenize();
	const parser = new HextParser(tokens);
	const ast = parser.parse();
	const transformer = new TerrainTransformer(ast);
	transformer.process();
	expect(ast).toEqual(
		new Hextmap({
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
