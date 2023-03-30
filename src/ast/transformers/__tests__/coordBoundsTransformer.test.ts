import { CoordBoundsTransformer } from "../coordBoundsTransformer.js";
import { Hexmap, HexGeometry } from "../../nodes/index.js";

test("finds the min and max coordinates within a Hexmap and adds them to the Hexmap node", () => {
	const ast = new Hexmap({
		children: {
			statements: [
				new HexGeometry({
					primitives: {
						coord: "fake",
						col: 0,
						row: 0,
						q: 0,
						r: 0,
						vertices: [
							{ x: 200, y: 200 },
							{ x: 0, y: 0 },
						],
					},
				}),
				new HexGeometry({
					primitives: {
						coord: "fake",
						col: 0,
						row: 0,
						q: 0,
						r: 0,
						vertices: [
							{ x: -100, y: 0 },
							{ x: 100, y: -200 },
						],
					},
				}),
			],
		},
	});
	CoordBoundsTransformer.process(ast);
	expect(ast.primitives["minX"]).toBe(-100);
	expect(ast.primitives["maxX"]).toBe(200);
	expect(ast.primitives["minY"]).toBe(-200);
	expect(ast.primitives["maxY"]).toBe(200);
});
