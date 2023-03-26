import { HextLexer } from "./hextLexer";
import { HextParser } from "./hextParser";

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

		return JSON.stringify(ast);

		// Applying transformers
		// - Extract metadata - in particular we need to know if we're dealing with flat-top or point-top hexes?
		// - Turn path coordinates into hexes
		// - Generate origins and vertices for all hexes
		// - Turn all "renderables" into their own nodes (labels, terrain, etc)
		// - Update nodes that need external data (terrain -> hex colors, icons -> svgs, etc)
		// const metadataTransformer = new MetadataTransformer();
		// ast.accept(metadataTransformer);
		// const xyTransformer = new HexXYTransformer();
		// ast.accept(xyTransformer);

		// Generating SVG output
		// const svgGenerator = new SVGGenerator(metadataTransformer.metadata);
		// return svgGenerator.process(ast);
	}
}
