const _ = require("lodash");
const moment = require("moment");
const Chance = new require("chance")(moment());
const token = require("./Token");

class MakeExample {
  constructor(tokens) {
    this.tokens = _.cloneDeep(tokens);
  }

  run() {
    for (var i = 0; i < this.tokens.length; ++i) {
      if (this.tokens[i].type === token.TYPE.VALUE) {
        this.tokens[i].value = Chance.natural({ max: 100 });
      }
    }

    return this.tokens;
  }

  toString() {
    let example = "";
    for (var i = 0; i < this.tokens.length; ++i) {
      example += `${this.tokens[i].value}`;
    }

    return example;
  }
}

module.exports = MakeExample;
