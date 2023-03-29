import { HextLexer } from "./hextLexer";
import { HextParser } from "./hextParser";
import {
	MetadataTransformer,
	HexGeometryTransformer,
	PathfindingTransformer,
	HexPixelTransformer,
	RenderableTransformer,
	TerrainTransformer,
} from "./ast/transformers";

// import MetadataTransformer from './MetadataTransformer';
// import HexXYTransformer from './HexXYTransformer';
// import SVGGenerator from './SVGGenerator';
// import { ASTNode } from './types';

export class HextSVGTranspiler {
	constructor(private input: string) {}

	public transpile(): string {
		// Lexing and Parsing
		const lexer = new HextLexer(this.input);
		const tokens = lexer.tokenize();
		const parser = new HextParser(tokens);
		const ast = parser.parse();

		// Applying Transformers
		const metadataTransformer = new MetadataTransformer(ast);
		metadataTransformer.process();
		const { metadata } = metadataTransformer;
		RenderableTransformer.process(ast);
		TerrainTransformer.process(ast);
		HexGeometryTransformer.process(ast);
		PathfindingTransformer.process(ast);
		HexPixelTransformer.process(ast, { size: 500 });

		console.log(JSON.stringify(ast, null, 2));
		return JSON.stringify(ast);

		// Generating SVG output
		// const svgGenerator = new SVGGenerator(metadataTransformer.metadata);
		// return svgGenerator.process(ast);
	}
}
