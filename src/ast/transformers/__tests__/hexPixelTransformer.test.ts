import { Lexer } from "../../../lexer.js";
import { Parser } from "../../../parser.js";
import { HexGeometryTransformer, HexPixelTransformer } from "../index.js";
import {
	Hexmap,
	HexDefinition,
	PathDefinition,
	HexGeometry,
} from "../../nodes/index.js";

const tap = (x: any, f: (x: any) => void) => {
	f(x);
	return x;
};
const approx = (value: number, epsilon = 0.1) => ({
	$$typeof: Symbol.for("jest.asymmetricMatcher"),
	asymmetricMatch: (other: any) => Math.abs(value - other) < epsilon,
	toAsymmetricMatcher: () => `~${value}`,
});

test("decorate HexGeometry nodes with origin, vertices coordinates", () => {
	const map = `
		0001 water
		0001-0002 road
	`;
	const lexer = new Lexer(map);
	const tokens = lexer.tokenize();
	const parser = new Parser(tokens);
	const ast = parser.parse();
	HexGeometryTransformer.process(ast);
	HexPixelTransformer.process(ast, { size: 500 });
	expect(ast).toEqual(
		new Hexmap({
			children: {
				statements: [
					new HexDefinition({
						children: {
							hexGeometry: tap(
								HexGeometry.fromCoord("0001"),
								(g) => {
									Object.assign(g.primitives, {
										origin: {
											x: 0,
											y: approx(866.02),
										},
										vertices: [
											{ x: 500, y: approx(866) },
											{ x: approx(250), y: approx(1299) },
											{
												x: approx(-250),
												y: approx(1299),
											},
											{ x: -500, y: approx(866) },
											{ x: approx(-250), y: approx(433) },
											{ x: approx(250), y: approx(433) },
										],
									});
								}
							),
						},
						primitives: { terrain: "water" },
					}),
					new PathDefinition({
						children: {
							hexGeometries: [
								tap(HexGeometry.fromCoord("0001"), (g) => {
									Object.assign(g.primitives, {
										origin: {
											x: 0,
											y: approx(866.02),
										},
										vertices: [
											{ x: 500, y: approx(866) },
											{ x: approx(250), y: approx(1299) },
											{
												x: approx(-250),
												y: approx(1299),
											},
											{ x: -500, y: approx(866) },
											{ x: approx(-250), y: approx(433) },
											{ x: approx(250), y: approx(433) },
										],
									});
								}),
								tap(HexGeometry.fromCoord("0002"), (g) => {
									Object.assign(g.primitives, {
										origin: {
											x: 0,
											y: approx(1732),
										},
										vertices: [
											{ x: 500, y: approx(1732) },
											{ x: approx(250), y: approx(2165) },
											{
												x: approx(-250),
												y: approx(2165),
											},
											{ x: -500, y: approx(1732) },
											{
												x: approx(-250),
												y: approx(1299),
											},
											{ x: approx(250), y: approx(1299) },
										],
									});
								}),
							],
						},
						primitives: { pathType: "road" },
					}),
				],
			},
		})
	);
});
