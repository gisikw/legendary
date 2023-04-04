import { Lexer } from "../../../lexer.js";
import { Parser } from "../../../parser.js";
import { RenderableTransformer, HexGeometryTransformer } from "../index.js";
import {
	HexCoord,
	HexDefinition,
	HexGeometry,
	HexIcon,
	HexLabel,
	Hexmap,
	PathDefinition,
	PathLabel,
} from "../../nodes/index.js";

test("breaks apart nodes that contain multiple renderable component", () => {
	const map = `
		0202 [[My Link]] water leviathan "The Monster"
		0202-0303 river "The Fancy River"
	`;
	const lexer = new Lexer(map);
	const tokens = lexer.tokenize();
	const parser = new Parser(tokens);
	const ast = parser.parse();
	HexGeometryTransformer.process(ast);
	const transformer = new RenderableTransformer(ast);
	transformer.process();
	expect(ast).toEqual(
		new Hexmap({
			children: {
				statements: [
					new HexDefinition({
						children: {
							hexGeometry: HexGeometry.fromCoord("0202"),
							renderables: [
								new HexCoord({
									primitives: {
										text: "0202",
										q: 2,
										r: 1,
									},
								}),
								new HexIcon({
									primitives: {
										name: "leviathan",
										q: 2,
										r: 1,
									},
								}),
								new HexLabel({
									primitives: {
										text: "The Monster",
										q: 2,
										r: 1,
									},
								}),
							],
						},
						primitives: {
							terrain: "water",
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
							hexGeometries: [
								HexGeometry.fromCoord("0202"),
								HexGeometry.fromCoord("0303"),
							],
						},
						primitives: {
							pathType: "river",
						},
					}),
				],
			},
		})
	);
});
