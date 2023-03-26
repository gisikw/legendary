import { lexer } from './lexer';
import { Parser } from './parser';

test('simple test', () => {
	const tokens = lexer(`
	my map title : greatest map ever
	0202 water
	0502 [[The cool link]] forest castle "My Evil Castle"
	0306 island "My Island"
	0202-0306 river
`);
	const parser = new Parser(tokens);
	const ast = parser.parse();
	expect(ast).toEqual({
		type: 'hextmap',
		statements: [
			{ type: 'metadata', key: 'my map title', value: 'greatest map ever' },
			{ type: 'hex_definition', 'coordinate': '0202', terrain: 'water' },
			{ type: 'hex_definition', 'coordinate': '0502', link: 'The cool link', terrain: 'forest', icon: 'castle', label: 'My Evil Castle' },
			{ type: 'hex_definition', 'coordinate': '0306', terrain: 'island', label: 'My Island' },
			{ type: 'path_definition', 'coordinates': ['0202','0306'], pathType: 'river' }
		]
	})
});

test('stress test', () => {
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
	const tokens = lexer(map);
	const parser = new Parser(tokens);
	const ast = parser.parse();
	expect(ast).toEqual({
		type: 'hextmap',
		statements: [
			{ type: 'metadata', key: 'orientation', value: 'flat-top' },
			{ type: 'metadata', key: 'map title', value: 'The greatest map ever' },
			{ type: 'hex_definition', coordinate: '0000', link: 'Link to a Water File', terrain: 'water' },
			{ type: 'hex_definition', coordinate: '0001', terrain: 'forest', label: 'The Woods' },
			{ type: 'hex_definition', coordinate: '0100', terrain: 'water' },
			{ type: 'hex_definition', coordinate: '0101', terrain: 'grass', icon: 'castle-icon', label: 'The Keep' },
			{ type: 'hex_definition', coordinate: '0102', link: 'The Fields', terrain: 'grass', label: 'The Fields' },
			{ type: 'hex_definition', coordinate: '0103', link: 'Pyramid\'s Panic', terrain: 'desert', icon: 'pyramid' },
			{ type: 'hex_definition', coordinate: '0104', link: 'Endgame: The end is near', terrain: 'desert', icon: 'temple', label: 'The - Evil: Temple' },
			{ type: 'hex_definition', coordinate: '0203' },
			{ type: 'path_definition', coordinates: ['0001','0101','0102'], pathType: 'road' },
			{ type: 'path_definition', coordinates: ['0102','0100'], pathType: 'river', label: 'The River Label' },
		]
	});
});
