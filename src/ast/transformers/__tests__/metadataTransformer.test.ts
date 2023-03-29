import { Lexer } from "../../../lexer";
import { Parser } from "../../../parser";
import { MetadataTransformer } from "../metadataTransformer";
import { Hexmap, HexDefinition } from "../../nodes";

test("extract metadata nodes and aggregate key:value pairs", () => {
	const map = `
		map title: Awesome Map
		orientation: flat-top
		0202
	`;
	const lexer = new Lexer(map);
	const tokens = lexer.tokenize();
	const parser = new Parser(tokens);
	const ast = parser.parse();
	const transformer = new MetadataTransformer(ast);
	transformer.process();
	expect(transformer.metadata).toEqual({
		"map title": "Awesome Map",
		orientation: "flat-top",
	});
	expect(ast).toEqual(
		new Hexmap({
			children: {
				statements: [
					new HexDefinition({
						primitives: {
							coordinates: "0202",
						},
					}),
				],
			},
		})
	);
});
