import { HextSVGTranspiler } from "../hextSvgTranspiler";

test("simple test", () => {
	const map = `
		orientation: flat-top
		map title : The greatest map ever

		0000 [[Link to a Water File]] water
		0001 forest "The Woods"
		0100 water

		0101 grass     castle-icon "The Keep"
		0102 [[The Fields]] grass "The Fields"

		0103 [[Pyramid's Panic]]  desert   pyramid
		0104 [[Endgame: The end is near]] desert temple "The - Evil: Temple"

		0203

		0001-0101-0102 road
		0102-0100 river "The River Label"
	`;
	const transpiler = new HextSVGTranspiler(map);
	const svg = transpiler.transpile();
	expect(typeof svg).toBe("string");
});
