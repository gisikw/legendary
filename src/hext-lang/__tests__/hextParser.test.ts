import { HextLexer } from "../hextLexer";
import { HextParser } from "../hextParser";
import {
	Hextmap,
	Statement,
	Metadata,
	HexDefinition,
	PathDefinition,
} from "../ast/nodes";

test("simple test", () => {
	const map = `
	my map title : greatest map ever
	0202 water
	0502 [[The cool link]] forest castle "My Evil Castle"
	0306 island "My Island"
	0202-0306 river`;
	const lexer = new HextLexer(map);
	const tokens = lexer.tokenize();
	const parser = new HextParser(tokens);
	const ast = parser.parse();
	expect(ast).toEqual(
		new Hextmap({
			children: {
				statements: [
					new Metadata({
						primitives: {
							key: "my map title",
							value: "greatest map ever",
						},
					}),
					new HexDefinition({
						primitives: {
							coordinate: "0202",
							terrain: "water",
						},
					}),
					new HexDefinition({
						primitives: {
							coordinate: "0502",
							link: "The cool link",
							terrain: "forest",
							icon: "castle",
							label: "My Evil Castle",
						},
					}),
					new HexDefinition({
						primitives: {
							coordinate: "0306",
							terrain: "island",
							label: "My Island",
						},
					}),
					new PathDefinition({
						primitives: {
							coordinates: ["0202", "0306"],
							pathType: "river",
						},
					}),
				],
			},
		})
	);
});

test("stress test", () => {
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
	const lexer = new HextLexer(map);
	const tokens = lexer.tokenize();
	const parser = new HextParser(tokens);
	const ast = parser.parse();
	expect(ast).toEqual(
		new Hextmap({
			children: {
				statements: [
					new Metadata({
						primitives: { key: "orientation", value: "flat-top" },
					}),
					new Metadata({
						primitives: {
							key: "map title",
							value: "The greatest map ever",
						},
					}),
					new HexDefinition({
						primitives: {
							coordinate: "0000",
							link: "Link to a Water File",
							terrain: "water",
						},
					}),
					new HexDefinition({
						primitives: {
							coordinate: "0001",
							terrain: "forest",
							label: "The Woods",
						},
					}),
					new HexDefinition({
						primitives: {
							coordinate: "0100",
							terrain: "water",
						},
					}),
					new HexDefinition({
						primitives: {
							coordinate: "0101",
							terrain: "grass",
							icon: "castle-icon",
							label: "The Keep",
						},
					}),
					new HexDefinition({
						primitives: {
							coordinate: "0102",
							link: "The Fields",
							terrain: "grass",
							label: "The Fields",
						},
					}),
					new HexDefinition({
						primitives: {
							coordinate: "0103",
							link: "Pyramid's Panic",
							terrain: "desert",
							icon: "pyramid",
						},
					}),
					new HexDefinition({
						primitives: {
							coordinate: "0104",
							link: "Endgame: The end is near",
							terrain: "desert",
							icon: "temple",
							label: "The - Evil: Temple",
						},
					}),
					new HexDefinition({
						primitives: {
							coordinate: "0203",
						},
					}),
					new PathDefinition({
						primitives: {
							coordinates: ["0001", "0101", "0102"],
							pathType: "road",
						},
					}),
					new PathDefinition({
						primitives: {
							coordinates: ["0102", "0100"],
							pathType: "river",
							label: "The River Label",
						},
					}),
				],
			},
		})
	);
});
