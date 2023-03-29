import { Lexer } from "../../../lexer";
import { Parser } from "../../../parser";
import { HexGeometryTransformer } from "../hexGeometryTransformer";
import {
	Hexmap,
	HexDefinition,
	PathDefinition,
	HexGeometry,
} from "../../nodes";

test("add HexGeometry nodes to HexDefinitions and PathDefinitions", () => {
	const map = `
		0202 water
		0202-0303 river
	`;
	const lexer = new Lexer(map);
	const tokens = lexer.tokenize();
	const parser = new Parser(tokens);
	const ast = parser.parse();
	const transformer = new HexGeometryTransformer(ast);
	transformer.process();
	expect(ast).toEqual(
		new Hexmap({
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
