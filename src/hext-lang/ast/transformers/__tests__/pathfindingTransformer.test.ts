import { HextLexer } from "../../../HextLexer";
import { HextParser } from "../../../HextParser";
import { PathfindingTransformer, HexGeometryTransformer } from "..";
import {
	Hextmap,
	Statement,
	Metadata,
	HexDefinition,
	PathDefinition,
	HexGeometry,
} from "../../nodes";

test("enhance PathDefinition nodes by pathfinding between waypoint coordinates", () => {
	const map = `0000-0301-0500 road`;
	const lexer = new HextLexer(map);
	const tokens = lexer.tokenize();
	const parser = new HextParser(tokens);
	const ast = parser.parse();
	HexGeometryTransformer.process(ast);
	PathfindingTransformer.process(ast);
	expect(ast).toEqual(
		new Hextmap({
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
