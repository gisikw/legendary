import { HextLexer } from "../../../HextLexer";
import { HextParser } from "../../../HextParser";
import { MetadataTransformer } from "../metadataTransformer";
import {
	Hextmap,
	Statement,
	Metadata,
	HexDefinition,
	PathDefinition,
} from "../../nodes";

test("extract metadata nodes and aggregate key:value pairs", () => {
	const map = `
		map title: Awesome Map
		orientation: flat-top
		0202
	`;
	const lexer = new HextLexer(map);
	const tokens = lexer.tokenize();
	const parser = new HextParser(tokens);
	const ast = parser.parse();
	const transformer = new MetadataTransformer(ast);
	transformer.process();
	expect(transformer.metadata).toEqual({
		"map title": "Awesome Map",
		orientation: "flat-top",
	});
	expect(ast).toEqual(
		new Hextmap({
			children: {
				statements: [
					new HexDefinition({
						primitives: {
							coordinate: "0202",
						},
					}),
				],
			},
		})
	);
});
