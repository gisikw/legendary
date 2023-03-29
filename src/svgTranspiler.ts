import { Lexer } from "./lexer";
import { Parser } from "./parser";
import {
	CoordBoundsTransformer,
	HexGeometryTransformer,
	HexPixelTransformer,
	MetadataTransformer,
	PathfindingTransformer,
	RenderableTransformer,
	TerrainTransformer,
	SVGTagTransformer,
} from "./ast/transformers";
import { SVGGenerator } from "./ast/generators";

export class SVGTranspiler {
	constructor(private input: string) {}

	public transpile(): string {
		// Lexing and Parsing
		const lexer = new Lexer(this.input);
		const tokens = lexer.tokenize();
		const parser = new Parser(tokens);
		const ast = parser.parse();

		// Applying Transformers
		const metadataTransformer = new MetadataTransformer(ast);
		metadataTransformer.process();
		// const { metadata } = metadataTransformer;
		RenderableTransformer.process(ast);
		TerrainTransformer.process(ast);
		HexGeometryTransformer.process(ast);
		PathfindingTransformer.process(ast);
		HexPixelTransformer.process(ast, { size: 500 });
		CoordBoundsTransformer.process(ast);
		SVGTagTransformer.process(ast);

		const output = SVGGenerator.generate(ast);
		console.log(output);
		return output;
	}
}
