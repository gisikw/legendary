export enum TokenType {
  NEWLINE,
  WHITESPACE,
  COLON,
  DASH,
  DOUBLE_OPEN_BRACKET,
  DOUBLE_CLOSE_BRACKET,
  QUOTE,
  COORDINATE,
  WORD,
}

export interface Token {
  type: TokenType;
  value: string;
}

