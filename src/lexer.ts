import { TokenType } from "./types.js";
import type { Token } from "./types.js";

function isNonWhitespaceCharacter(char: string): boolean {
	return /\S/.test(char);
}

function isCoordinate(input: string): boolean {
	return /\d{4}/.test(input);
}

function isCoordinateSequence(input: string): boolean {
	return /\d{4}-(?:\d{4}-)*\d{4}/.test(input);
}

export class Lexer {
	constructor(private readonly input: string) {}

	public tokenize(): Token[] {
		const tokens: Token[] = [];
		let position = 0;
		let isBracketed = false;

		while (position < this.input.length) {
			const char = this.input[position];

			if (char === "\n") {
				tokens.push({ type: TokenType.NEWLINE, value: char });
				position++;
			} else if (char === " " || char === "\t") {
				tokens.push({ type: TokenType.WHITESPACE, value: char });
				position++;
			} else if (char === ":" && !isBracketed) {
				tokens.push({ type: TokenType.COLON, value: char });
				position++;
			} else if (
				char === "[" &&
				this.input.charAt(position + 1) === "["
			) {
				tokens.push({
					type: TokenType.DOUBLE_OPEN_BRACKET,
					value: "[[",
				});
				position += 2;
				isBracketed = true;
			} else if (
				char === "]" &&
				this.input.charAt(position + 1) === "]"
			) {
				tokens.push({
					type: TokenType.DOUBLE_CLOSE_BRACKET,
					value: "]]",
				});
				position += 2;
				isBracketed = false;
			} else if (char === '"') {
				tokens.push({ type: TokenType.QUOTE, value: char });
				position++;
				isBracketed = !isBracketed;
			} else {
				let tokenValue = "";
				const terminators = ["\n", " ", "\t", "[", "]", '"'];
				if (!isBracketed) terminators.push(":");
				while (
					position < this.input.length &&
					!terminators.includes(this.input.charAt(position)) &&
					isNonWhitespaceCharacter(this.input.charAt(position))
				) {
					tokenValue = `${tokenValue}${this.input[position] ?? ""}`;
					position++;
				}

				if (isCoordinateSequence(tokenValue)) {
					tokenValue
						.split("-")
						.flatMap((s) => [
							{ type: TokenType.DASH, value: "-" },
							{ type: TokenType.COORDINATE, value: s },
						])
						.slice(1)
						.forEach((token) => {
							tokens.push(token);
						});
				} else if (isCoordinate(tokenValue)) {
					tokens.push({
						type: TokenType.COORDINATE,
						value: tokenValue,
					});
				} else {
					tokens.push({ type: TokenType.WORD, value: tokenValue });
				}
			}
		}

		tokens.push({ type: TokenType.NEWLINE, value: "\n" });
		return tokens;
	}
}
