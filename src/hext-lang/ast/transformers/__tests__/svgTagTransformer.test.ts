import { HextLexer } from "../../../HextLexer";
import { HextParser } from "../../../HextParser";
import {
	CoordBoundsTransformer,
	HexGeometryTransformer,
	HexPixelTransformer,
	MetadataTransformer,
	PathfindingTransformer,
	RenderableTransformer,
	SVGTagTransformer,
	TerrainTransformer,
} from "..";

import {
	Hextmap,
	Statement,
	Metadata,
	HexDefinition,
	PathDefinition,
	HexCoord,
} from "../../nodes";

test("Write .svgPre and .svgPost attributes on primitives that should render out", () => {
	const map = "0202 water";
	const lexer = new HextLexer(map);
	const tokens = lexer.tokenize();
	const parser = new HextParser(tokens);
	const ast = parser.parse();
	const metadataTransformer = new MetadataTransformer(ast);
	metadataTransformer.process();
	const { metadata } = metadataTransformer;
	RenderableTransformer.process(ast);
	TerrainTransformer.process(ast);
	HexGeometryTransformer.process(ast);
	PathfindingTransformer.process(ast);
	HexPixelTransformer.process(ast, { size: 500 });
	CoordBoundsTransformer.process(ast);
	SVGTagTransformer.process(ast);
	expect(ast).toEqual(
		new Hextmap({
			primitives: {
				svgPre: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="990 1289.0381056766578 1020 886.0254037844388">',
				svgPost: "</svg>",
			},
			children: {
				statements: [
					new HexDefinition({
						children: {
							renderables: [
								new HexCoord({ primitives: { text: "0202" } }),
							],
						},
						primitives: {
							svgPre: `<polygon fill="#0000ff" points="2000,1732.0508075688772 1750,2165.0635094610966 1250,2165.0635094610966 1000,1732.0508075688772 1249.9999999999998,1299.038105676658 1750,1299.0381056766578" stroke="black" stroke-width="2" />`,
						},
					}),
				],
			},
		})
	);
});
