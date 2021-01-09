const Token = require("./Token");

class Lexer {
  text = null;
  pos = null;

  constructor(text) {
    this.text = text;
    this.pos = 0;
  }
  run() {
    const tokens = [];

    let token = null;
    while ((token = this.GetNextToken()).type != Token.TYPE.EOF) {
      tokens.push(token);
    }
    return tokens;
  }

  CurrentChar() {
    return this.text.length > this.pos ? this.text[this.pos] : null;
  }

  GetNextToken() {
    while (this.CurrentChar() !== null) {
      if (
        parseInt(this.CurrentChar()) >= 0 &&
        parseInt(this.CurrentChar()) <= 9
      ) {
        return new Token({ type: Token.TYPE.VALUE, value: this.GetInteger() });
      }
      switch (this.CurrentChar()) {
        case " ":
          this.SkipSpace();
          continue;
        case "+":
          this.MoveNext();
          return new Token({ type: Token.TYPE.PLUS, value: "+" });
        case "-":
          this.MoveNext();
          return new Token({ type: Token.TYPE.MINUS, value: "-" });
        case "*":
          this.MoveNext();
          return new Token({ type: Token.TYPE.MUL, value: "*" });
        case "/":
          this.MoveNext();
          return new Token({ type: Token.TYPE.DIV, value: "/" });
        case "(":
          this.MoveNext();
          return new Token({ type: Token.TYPE.LEFT_PARENS, value: "(" });
        case ")":
          this.MoveNext();
          return new Token({ type: Token.TYPE.RIGHT_PARENS, value: ")" });
        default:
          throw new Error(`${CurrentChar} : 유효하지 않은 문자입니다.`);
          break;
      }
    }

    return new Token({ type: Token.TYPE.EOF, value: "" });
  }

  GetInteger() {
    let integer = 0;
    do {
      integer = integer * 10 + parseInt(this.CurrentChar()) - 0;
      this.MoveNext();
    } while (
      parseInt(this.CurrentChar()) >= 0 &&
      parseInt(this.CurrentChar()) <= 9
    );

    return integer;
  }

  MoveNext() {
    this.pos++;
  }

  SkipSpace() {
    do {
      this.MoveNext();
    } while (this.CurrentChar() === " ");
  }
}

module.exports = Lexer;
