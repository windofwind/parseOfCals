class Token {
  static TYPE = {
    VALUE: "VALUE",
    PLUS: "PLUS",
    MINUS: "MINUS",
    MUL: "MUL",
    DIV: "DIV",
    LEFT_PARENS: "LEFT_PARENS",
    RIGHT_PARENS: "RIGHT_PARENS",
    EOF: 999,
  };

  type = Token.TYPE.EOF;
  value = null;

  constructor({ type, value }) {
    this.type = type;
    this.value = value;
  }
}

module.exports = Token;
