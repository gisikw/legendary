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
		const { config } = metadataTransformer;
		HexGeometryTransformer.process(ast, config);
		PathfindingTransformer.process(ast, config);
		HexPixelTransformer.process(ast, config);
		RenderableTransformer.process(ast, config);
		TerrainTransformer.process(ast);
		CoordBoundsTransformer.process(ast);
		SVGTagTransformer.process(ast);

		return SVGGenerator.generate(ast);
	}
}
