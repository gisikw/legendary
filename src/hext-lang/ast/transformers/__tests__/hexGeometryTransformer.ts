import { HextLexer } from "../../../HextLexer";
import { HextParser } from "../../../HextParser";
import { HexGeometryTransformer } from "../hexGeometryTransformer";
import {
	Hextmap,
	Statement,
	Metadata,
	HexDefinition,
	PathDefinition,
	HexGeometry,
} from "../../nodes";

test("add HexGeometry nodes to HexDefinitions and PathDefinitions", () => {
	const map = `
		0202 water
		0202-0303 river
	`;
	const lexer = new HextLexer(map);
	const tokens = lexer.tokenize();
	const parser = new HextParser(tokens);
	const ast = parser.parse();
	const transformer = new HexGeometryTransformer(ast);
	transformer.process();
	expect(ast).toEqual(
		new Hextmap({
			children: {
				statements: [
					new HexDefinition({
						children: {
							hexGeometry: HexGeometry.fromCoord("0202"),
						},
						primitives: { terrain: "water" },
					}),
					new PathDefinition({
						children: {
							hexGeometries: [
								HexGeometry.fromCoord("0202"),
								HexGeometry.fromCoord("0303"),
							],
						},
						primitives: { pathType: "river" },
					}),
				],
			},
		})
	);
});
