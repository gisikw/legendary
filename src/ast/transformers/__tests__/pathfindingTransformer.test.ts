import { Lexer } from "../../../lexer.js";
import { Parser } from "../../../parser.js";
import { PathfindingTransformer, HexGeometryTransformer } from "../index.js";
import { Hexmap, PathDefinition, HexGeometry } from "../../nodes/index.js";

test("enhance PathDefinition nodes by pathfinding between waypoint coordinates", () => {
	const map = `0000-0301-0500 road`;
	const lexer = new Lexer(map);
	const tokens = lexer.tokenize();
	const parser = new Parser(tokens);
	const ast = parser.parse();
	HexGeometryTransformer.process(ast);
	PathfindingTransformer.process(ast);
	expect(ast).toEqual(
		new Hexmap({
			children: {
				statements: [
					new PathDefinition({
						children: {
							hexGeometries: [
								HexGeometry.fromCoord("0000"),
								HexGeometry.fromCoord("0100"),
								HexGeometry.fromCoord("0201"),
								HexGeometry.fromCoord("0301"),
								HexGeometry.fromCoord("0401"),
								HexGeometry.fromCoord("0500"),
							],
						},
						primitives: { pathType: "road" },
					}),
				],
			},
		})
	);
});
