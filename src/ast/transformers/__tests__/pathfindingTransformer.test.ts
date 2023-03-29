import { Lexer } from "../../../lexer";
import { Parser } from "../../../parser";
import { PathfindingTransformer, HexGeometryTransformer } from "..";
import { Hexmap, PathDefinition, HexGeometry } from "../../nodes";

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
