import { HextLexer } from "../../../HextLexer";
import { HextParser } from "../../../HextParser";
import { RenderableTransformer } from "../RenderableTransformer";
import {
	Hextmap,
	Statement,
	Metadata,
	HexDefinition,
	PathDefinition,
	HexGeometry,
	HexLabel,
	HexCoord,
	HexIcon,
	PathLabel,
} from "../../nodes";

test("breaks apart nodes that contain multiple renderable component", () => {
	const map = `
		0202 [[My Link]] water leviathan "The Monster"
		0202-0303 river "The Fancy River"
	`;
	const lexer = new HextLexer(map);
	const tokens = lexer.tokenize();
	const parser = new HextParser(tokens);
	const ast = parser.parse();
	const transformer = new RenderableTransformer(ast);
	transformer.process();
	expect(ast).toEqual(
		new Hextmap({
			children: {
				statements: [
					new HexDefinition({
						children: {
							renderables: [
								new HexCoord({
									primitives: { text: "0202" },
								}),
								new HexIcon({
									primitives: { name: "leviathan" },
								}),
								new HexLabel({
									primitives: { text: "The Monster" },
								}),
							],
						},
						primitives: {
							terrain: "water",
							coordinates: "0202",
							link: "My Link",
						},
					}),
					new PathDefinition({
						children: {
							renderables: [
								new PathLabel({
									primitives: { text: "The Fancy River" },
								}),
							],
						},
						primitives: {
							pathType: "river",
							coordinates: ["0202", "0303"],
						},
					}),
				],
			},
		})
	);
});
