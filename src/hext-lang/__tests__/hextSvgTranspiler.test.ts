import { HextSVGTranspiler } from "../hextSvgTranspiler";

test("simple test", () => {
	const map = "0000 water";
	const transpiler = new HextSVGTranspiler(map);
	const svg = transpiler.transpile();
	expect(typeof svg).toBe("string");
});
