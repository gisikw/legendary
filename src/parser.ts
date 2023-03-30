import { TokenType } from "./types.js";
import type { Token } from "./types.js";
import {
	Hexmap,
	Metadata,
	HexDefinition,
	PathDefinition,
} from "./ast/nodes/index.js";
import type { Statement } from "./ast/nodes/index.js";

export class Parser {
	private readonly tokens: Token[];
	private position: number;

	constructor(tokens: Token[]) {
		this.tokens = tokens;
		this.position = 0;
	}

	parse(): Hexmap {
		const statements: Statement[] = [];
		const hexmap = new Hexmap({
			children: { statements },
		});

		while (this.position < this.tokens.length) {
			const statement = this.parseStatement();
			if (statement != null) statements.push(statement);
		}

		return hexmap;
	}

	private parseStatement(): Statement | undefined {
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
				this.consumeToken(TokenType.NEWLINE);
				return;
			default:
				throw new Error(
					`Unexpected token type: ${TokenType[this.peek().type]}`
				);
		}
	}

	private parseMetadata(): Metadata {
		const key = this.parseKey();
		const value = this.parseValue();

		this.consumeWhitespace();
		this.consumeToken(TokenType.NEWLINE);
		return new Metadata({
			primitives: { key, value },
		});
	}

	private parseKey(): string {
		this.consumeWhitespace();
		let result = "";
		while (this.peek().type !== TokenType.COLON) {
			result = result + this.consumeToken(this.peek().type).value;
		}
		this.consumeToken(TokenType.COLON);
		return result.trim();
	}

	private parseValue(): string {
		this.consumeWhitespace();
		let result = "";
		while (this.peek().type !== TokenType.NEWLINE) {
			result = result + this.consumeToken(this.peek().type).value;
		}
		return result.trim();
	}

	private parseHexDefinition(): HexDefinition {
		const coordinates = this.parseCoordinate();
		const link = this.parseLink();
		const terrain = this.parseTerrain();
		const icon = this.parseIcon();
		const label = this.parseLabel();

		this.consumeWhitespace();
		this.consumeToken(TokenType.NEWLINE);

		return new HexDefinition({
			primitives: { coordinates, link, terrain, icon, label },
		});
	}

	private parseCoordinate(): string {
		this.consumeWhitespace();
		return this.consumeToken(TokenType.COORDINATE).value;
	}

	private parseLink(): string | undefined {
		this.consumeWhitespace();
		if (this.peek().type === TokenType.DOUBLE_OPEN_BRACKET) {
			this.consumeToken(TokenType.DOUBLE_OPEN_BRACKET);
			let result = "";
			while (this.peek().type !== TokenType.DOUBLE_CLOSE_BRACKET) {
				result = result + this.consumeToken(this.peek().type).value;
			}
			this.consumeToken(TokenType.DOUBLE_CLOSE_BRACKET);
			return result;
		}
		return undefined;
	}

	private parseTerrain(): string | undefined {
		this.consumeWhitespace();
		if (this.peek().type === TokenType.WORD) {
			return this.consumeToken(TokenType.WORD).value;
		}
		return undefined;
	}

	private parseIcon(): string | undefined {
		this.consumeWhitespace();
		if (this.peek().type === TokenType.WORD) {
			return this.consumeToken(TokenType.WORD).value;
		}
		return undefined;
	}

	private parseLabel(): string | undefined {
		this.consumeWhitespace();
		if (this.peek().type === TokenType.QUOTE) {
			this.consumeToken(TokenType.QUOTE);
			let result = "";
			while (this.peek().type !== TokenType.QUOTE) {
				result = result + this.consumeToken(this.peek().type).value;
			}
			this.consumeToken(TokenType.QUOTE);
			return result;
		}
		return undefined;
	}

	private parsePathDefinition(): PathDefinition {
		const coordinates = [];
		let coordinate = this.parsePathCoordinate();
		do {
			if (coordinate != null) coordinates.push(coordinate);
			coordinate = this.parsePathCoordinate();
		} while (coordinate != null);
		const pathType = this.parsePathType();
		const label = this.parsePathLabel();

		this.consumeWhitespace();
		this.consumeToken(TokenType.NEWLINE);

		return new PathDefinition({
			primitives: { coordinates, pathType, label },
		});
	}

	private parsePathCoordinate(): string | undefined {
		if (this.peek().type === TokenType.DASH)
			this.consumeToken(TokenType.DASH);
		if (this.peek().type === TokenType.COORDINATE) {
			return this.consumeToken(TokenType.COORDINATE).value;
		}
		return undefined;
	}

	private parsePathType(): string | undefined {
		this.consumeWhitespace();
		return this.consumeToken(TokenType.WORD).value;
	}

	private parsePathLabel(): string | undefined {
		this.consumeWhitespace();
		if (this.peek().type === TokenType.QUOTE) {
			this.consumeToken(TokenType.QUOTE);
			let result = "";
			while (this.peek().type !== TokenType.QUOTE) {
				result = result + this.consumeToken(this.peek().type).value;
			}
			this.consumeToken(TokenType.QUOTE);
			return result;
		}
		return undefined;
	}

	private peek(): Token {
		const token = this.tokens[this.position];
		if (token === undefined) {
			throw new Error("Unexpected end of token stream");
		}
		return token;
	}

	private lookahead(): Token {
		const token = this.tokens[this.position + 1];
		if (token === undefined) {
			throw new Error("Unexpected end of token stream");
		}
		return token;
	}

	private consumeWhitespace(): void {
		while (this.peek().type === TokenType.WHITESPACE)
			this.consumeToken(TokenType.WHITESPACE);
	}

	private consumeToken(expectedType: TokenType): Token {
		const currentToken = this.peek();

		if (currentToken.type !== expectedType) {
			throw new Error(
				`Expected token of type '${
					TokenType[expectedType]
				}', but found '${TokenType[currentToken.type]}' instead.`
			);
		}

		this.position++;
		return currentToken;
	}
}
