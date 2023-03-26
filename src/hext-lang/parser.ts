import { TokenType, Token } from './types';

interface ASTNode {
  type: string;
  children?: Record<string, any>;
}

interface Hextmap extends ASTNode {
  type: 'hextmap';
  statements: Statement[];
}

type Statement = Metadata | HexDefinition | PathDefinition | EmptyLine;

interface Metadata extends ASTNode {
  type: 'metadata';
  key: string;
  value: string;
}

interface HexDefinition extends ASTNode {
  type: 'hex_definition';
  coordinate: string;
  link?: string;
  terrain?: string;
  icon?: string;
  label?: string;
}

interface PathDefinition extends ASTNode {
  type: 'path_definition';
  coordinates: string[];
  pathType: string;
  label?: string;
}

interface EmptyLine extends ASTNode {
  type: 'empty_line';
}

export class Parser {
  private tokens: Token[];
  private position: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.position = 0;
  }

  parse(): Hextmap {
    const hextmap: Hextmap = { type: 'hextmap', statements: [] };

    while (this.position < this.tokens.length) {
		const statement = this.parseStatement();
		if (statement.type !== "empty_line") hextmap.statements.push(statement);
    }

    return hextmap;
  }

  private parseStatement(): Statement {
	this.consumeWhitespace();
    switch (this.peek().type) {
		case TokenType.WORD:
			return this.parseMetadata();
		  case TokenType.COORDINATE:
			if (this.lookahead().type === TokenType.DASH) {
				return this.parsePathDefinition();
			} else {
				return this.parseHexDefinition();
			}
		case TokenType.NEWLINE:
			return this.parseEmptyLine();
		default:
			throw new Error(`Unexpected token type: ${TokenType[this.peek().type]}`);
    }
  }

	private parseEmptyLine(): EmptyLine {
		this.consumeToken(TokenType.NEWLINE);
		return { type: 'empty_line' };
	}

	private parseMetadata(): Metadata {
		const key = this.parseKey();
		const value = this.parseValue();

		this.consumeWhitespace();
		this.consumeToken(TokenType.NEWLINE);
		return { 
			type: 'metadata',
			key, 
			value 
		};
	}

	private parseKey(): string {
		this.consumeWhitespace();
		let result = '';
		while (this.peek().type !== TokenType.COLON) {
			result = result + this.consumeToken(this.peek().type).value;
		}
		this.consumeToken(TokenType.COLON);
		return result.trim();
	}

	private parseValue(): string {
		this.consumeWhitespace();
		let result = '';
		while (this.peek().type !== TokenType.NEWLINE) {
			result = result + this.consumeToken(this.peek().type).value;
		}
		return result.trim();
	}

	private parseHexDefinition(): HexDefinition {
		const coordinate = this.parseCoordinate();
		const link = this.parseLink();
		const terrain = this.parseTerrain();
		const icon = this.parseIcon();
		const label = this.parseLabel();
		
		this.consumeWhitespace();
		this.consumeToken(TokenType.NEWLINE);

		return {
			type: 'hex_definition',
			coordinate,
			link,
			terrain,
			icon,
			label,
		};
	}

	private parseCoordinate(): string {
		this.consumeWhitespace();
		return this.consumeToken(TokenType.COORDINATE).value;
	}

	private parseLink(): string | undefined {
		this.consumeWhitespace();
		if (this.peek().type === TokenType.DOUBLE_OPEN_BRACKET) {
			this.consumeToken(TokenType.DOUBLE_OPEN_BRACKET);
			let result = '';
			while (this.peek().type !== TokenType.DOUBLE_CLOSE_BRACKET) {
				result = result + this.consumeToken(this.peek().type).value;
			}
			this.consumeToken(TokenType.DOUBLE_CLOSE_BRACKET);
			return result;
		}
	}

	private parseTerrain(): string | undefined {
		this.consumeWhitespace();
		if (this.peek().type === TokenType.WORD) {
			return this.consumeToken(TokenType.WORD).value;
		}
	}

	private parseIcon(): string | undefined {
		this.consumeWhitespace();
		if (this.peek().type === TokenType.WORD) {
			return this.consumeToken(TokenType.WORD).value;
		}
	}

	private parseLabel(): string | undefined {
		this.consumeWhitespace();
		if (this.peek().type === TokenType.QUOTE) {
			this.consumeToken(TokenType.QUOTE);
			let result = '';
			while (this.peek().type !== TokenType.QUOTE) {
				result = result + this.consumeToken(this.peek().type).value;
			}
			this.consumeToken(TokenType.QUOTE);
			return result;
		}
	}

	private parsePathDefinition(): PathDefinition {
		const coordinates = [];
		let coordinate = this.parsePathCoordinate();
		do {
			if (coordinate) coordinates.push(coordinate);
			coordinate = this.parsePathCoordinate();
		} while (coordinate);
		const pathType = this.parsePathType();
		const label = this.parsePathLabel();

		this.consumeWhitespace();
		this.consumeToken(TokenType.NEWLINE);

		return {
			type: 'path_definition',
			coordinates,
			pathType,
			label
		};
	}

	private parsePathCoordinate(): string | undefined {
		if (this.peek().type === TokenType.DASH) this.consumeToken(TokenType.DASH);
		if (this.peek().type === TokenType.COORDINATE) {
			return this.consumeToken(TokenType.COORDINATE).value;
		}
	}

	private parsePathType(): string {
		this.consumeWhitespace();
		return this.consumeToken(TokenType.WORD).value;
	}

	private parsePathLabel(): string | undefined {
		this.consumeWhitespace();
		if (this.peek().type === TokenType.QUOTE) {
			this.consumeToken(TokenType.QUOTE);
			let result = '';
			while (this.peek().type !== TokenType.QUOTE) {
				result = result + this.consumeToken(this.peek().type).value;
			}
			this.consumeToken(TokenType.QUOTE);
			return result;
		}
	}

	private peek(): Token {
		return this.tokens[this.position];
	}

	private lookahead(): Token {
		return this.tokens[this.position+1];
	}

	private consumeWhitespace(): void {
		while (this.peek().type === TokenType.WHITESPACE) this.consumeToken(TokenType.WHITESPACE);
	}

	private consumeToken(expectedType: TokenType): Token {
		const currentToken = this.peek();

		if (currentToken.type !== expectedType) {
			throw new Error(`Expected token of type '${TokenType[expectedType]}', but found '${TokenType[currentToken.type]}' instead.`);
		}

		this.position++;
		return currentToken;
	}
}
