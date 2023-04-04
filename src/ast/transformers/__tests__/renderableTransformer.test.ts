import { Lexer } from "../../../lexer.js";
import { Parser } from "../../../parser.js";
import {
	RenderableTransformer,
	HexGeometryTransformer,
	HexPixelTransformer,
} from "../index.js";
import {
	HexCoord,
	HexDefinition,
	HexIcon,
	HexLabel,
	Hexmap,
	PathDefinition,
	PathLabel,
} from "../../nodes/index.js";

const approx = (value: number, epsilon = 0.1): any => ({
	$$typeof: Symbol.for("jest.asymmetricMatcher"),
	asymmetricMatch: (other: any) => Math.abs(value - other) < epsilon,
	toAsymmetricMatcher: () => `~${value}`,
});
const anything = (): any => ({
	$$typeof: Symbol.for("jest.asymmetricMatcher"),
	asymmetricMatch: () => true,
	toAsymmetricMatcher: () => "anything",
});

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
	HexPixelTransformer.process(ast, { size: 500 });
	const transformer = new RenderableTransformer(ast);
	transformer.process();
	expect(ast).toEqual(
		new Hexmap({
			children: {
				statements: [
					new HexDefinition({
						children: {
							hexGeometry: anything(),
							renderables: [
								new HexCoord({
									primitives: {
										text: "0202",
										x: 1500,
										y: approx(1732.05),
									},
								}),
								new HexIcon({
									primitives: {
										name: "leviathan",
										x: 1500,
										y: approx(1732.05),
									},
								}),
								new HexLabel({
									primitives: {
										text: "The Monster",
										x: 1500,
										y: approx(1732.05),
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
							hexGeometries: anything(),
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
