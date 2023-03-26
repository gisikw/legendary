import { lexer } from './lexer';
import { TokenType } from './types';

test('tokenize sample inputs', () => {
	expect(lexer('0102-0100 river "The River Label"')).toEqual([
		{ type: TokenType.COORDINATE, value: '0102' },
		{ type: TokenType.DASH, value: '-' },
		{ type: TokenType.COORDINATE, value: '0100' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'river' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.QUOTE, value: '"' },
		{ type: TokenType.WORD, value: 'The' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'River' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'Label' },
		{ type: TokenType.QUOTE, value: '"' },
		{ type: TokenType.NEWLINE, value: '\n' }
	]);

	expect(lexer('0202 water')).toEqual([
		{ type: TokenType.COORDINATE, value: '0202' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'water' },
		{ type: TokenType.NEWLINE, value: '\n' }
	]);

	expect(lexer('my Title :the greatest title in the world')).toEqual([
		{ type: TokenType.WORD, value: 'my' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'Title' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.COLON, value: ':' },
		{ type: TokenType.WORD, value: 'the' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'greatest' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'title' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'in' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'the' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'world' },
		{ type: TokenType.NEWLINE, value: '\n' }
	]);

	expect(lexer(`
0201 [[My cool link]] forest castle "The Evil Castle"
0201-0202 road
`	)).toEqual([
		{ type: TokenType.NEWLINE, value: '\n' },
		{ type: TokenType.COORDINATE, value: '0201' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.DOUBLE_OPEN_BRACKET, value: '[[' },
		{ type: TokenType.WORD, value: 'My' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'cool' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'link' },
		{ type: TokenType.DOUBLE_CLOSE_BRACKET, value: ']]' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'forest' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'castle' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.QUOTE, value: '"' },
		{ type: TokenType.WORD, value: 'The' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'Evil' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'Castle' },
		{ type: TokenType.QUOTE, value: '"' },
		{ type: TokenType.NEWLINE, value: '\n' },
		{ type: TokenType.COORDINATE, value: '0201' },
		{ type: TokenType.DASH, value: '-' },
		{ type: TokenType.COORDINATE, value: '0202' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'road' },
		{ type: TokenType.NEWLINE, value: '\n' },
		{ type: TokenType.NEWLINE, value: '\n' }
	]);

	expect(lexer('0202-0203 cool-label')).toEqual([
		{ type: TokenType.COORDINATE, value: '0202' },
		{ type: TokenType.DASH, value: '-' },
		{ type: TokenType.COORDINATE, value: '0203' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'cool-label' },
		{ type: TokenType.NEWLINE, value: '\n' }
	]);

	expect(lexer('0202-0203 cool-label')).toEqual([
		{ type: TokenType.COORDINATE, value: '0202' },
		{ type: TokenType.DASH, value: '-' },
		{ type: TokenType.COORDINATE, value: '0203' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'cool-label' },
		{ type: TokenType.NEWLINE, value: '\n' }
	]);

	expect(lexer('0104 [[Endgame: The end is near]] desert temple "The - Evil: Temple"')).toEqual([
		{ type: TokenType.COORDINATE, value: '0104' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.DOUBLE_OPEN_BRACKET, value: '[[' },
		{ type: TokenType.WORD, value: 'Endgame:' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'The' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'end' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'is' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'near' },
		{ type: TokenType.DOUBLE_CLOSE_BRACKET, value: ']]' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'desert' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'temple' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.QUOTE, value: '"' },
		{ type: TokenType.WORD, value: 'The' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: '-' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'Evil:' },
		{ type: TokenType.WHITESPACE, value: ' ' },
		{ type: TokenType.WORD, value: 'Temple' },
		{ type: TokenType.QUOTE, value: '"' },
		{ type: TokenType.NEWLINE, value: '\n' }
	]);

});
