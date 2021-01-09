const Token = require("./Token");
class Interpreter {
  tokens = null;
  pos = 0;

  constructor(tokens) {
    this.tokens = tokens;
  }

  MoveNext() {
    this.pos++;
  }

  run() {
    return this.InterpreteExpression();
  }

  CurrentToken() {
    return this.tokens.length > this.pos
      ? this.tokens[this.pos]
      : new Token({ type: Token.TYPE.EOF });
  }

  Match(type) {
    if (this.CurrentToken().type !== type) {
      throw new Error(
        `${this.CurrentToken().type} : ${type} 타입 토큰이 필요합니다.`
      );
    }
    this.MoveNext();
  }

  // EBNF : expression = term, { "+" | "-", term };
  InterpreteExpression() {
    let expression = this.InterpreteTerm();

    while (
      this.CurrentToken().type === Token.TYPE.PLUS ||
      this.CurrentToken().type === Token.TYPE.MINUS
    ) {
      let op = this.CurrentToken();
      this.MoveNext();
      var term = this.InterpreteTerm();
      if (op.type === Token.TYPE.PLUS) {
        // console.log(`${expression} + ${term}`);
        expression += term;
      } else {
        // console.log(`${expression} - ${term}`);
        expression -= term;
      }
    }

    return expression;
  }

  // EBNF : factor = ( [ "+" | "-" ], integer ) | ( "(", expression, ")" ) ;
  InterpreteFactor() {
    const token = this.CurrentToken();
    this.MoveNext();

    let factor;

    switch (token.type) {
      case Token.TYPE.PLUS:
      case Token.TYPE.MINUS:
        let nextToken = this.CurrentToken();
        this.Match(Token.TYPE.VALUE);
        factor =
          token.type === Token.TYPE.PLUS
            ? nextToken.value
            : nextToken.value * -1;
        break;

      case Token.TYPE.VALUE:
        factor = token.value;
        break;

      case Token.TYPE.LEFT_PARENS:
        var expression = this.InterpreteExpression();
        this.Match(Token.TYPE.RIGHT_PARENS);
        factor = expression;
        break;

      default:
        throw new Error(`${token.type} : 알 수 없는 Token 타입입니다.`);
    }

    return factor;
  }

  // EBNF : term = factor, { "*" | "/", factor } ;
  InterpreteTerm() {
    let term = this.InterpreteFactor();

    while (
      this.CurrentToken().type === Token.TYPE.MUL ||
      this.CurrentToken().type === Token.TYPE.DIV
    ) {
      var op = this.CurrentToken();
      this.MoveNext();
      var factor = this.InterpreteFactor();
      if (op.type === Token.TYPE.MUL) {
        // console.log(`${term} * ${factor}`);
        term *= factor;
      } else {
        // console.log(`${term} / ${factor}`);
        term /= factor;
      }
    }

    return term;
  }
}

module.exports = Interpreter;
