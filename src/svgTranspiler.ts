import { Lexer } from "./lexer.js";
import { Parser } from "./parser.js";
import {
	CoordBoundsTransformer,
	HexGeometryTransformer,
	HexPixelTransformer,
	MetadataTransformer,
	PathfindingTransformer,
	RenderableTransformer,
	TerrainTransformer,
	SVGTagTransformer,
} from "./ast/transformers/index.js";
import { SVGGenerator } from "./ast/generators/index.js";

export class SVGTranspiler {
	constructor(private readonly input: string) {}

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
		HexGeometryTransformer.process(ast);
		RenderableTransformer.process(ast);
		TerrainTransformer.process(ast);
		PathfindingTransformer.process(ast);
		HexPixelTransformer.process(ast, { size: 500 });
		CoordBoundsTransformer.process(ast);
		SVGTagTransformer.process(ast);

		return SVGGenerator.generate(ast);
	}
}
