import { Lexer } from "../../../lexer.js";
import { Parser } from "../../../parser.js";
import { HexGeometryTransformer } from "../hexGeometryTransformer.js";
import {
	Hexmap,
	HexDefinition,
	PathDefinition,
	HexGeometry,
} from "../../nodes/index.js";

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
