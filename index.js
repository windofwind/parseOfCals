const fmt = require("fmt");
const Interpreter = require("./src/cals/Interpreter");
const Lexer = require("./src/cals/Lexer");
const Example = require("./src/cals/MakeExample");

(async (texture) => {
  let tokens;

  try {
    tokens = new Lexer(texture).run();
    fmt.title("문제 만들기");
    fmt.field("예시문제", texture);
    fmt.field("예시답안", new Interpreter(tokens).run());
    fmt.sep();

    for (var i = 0; i < 5; ++i) {
      const example = new Example(tokens);
      tokens = example.run();
      fmt.title(`문제 ${i}`);
      fmt.field("식", example.toString());
      fmt.field("답", new Interpreter(tokens).run());
    }
    fmt.sep(); /*  */
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(1);
  }
})("3 * 3 + (3 + 3)");

process.on("uncaughtException", function (err) {
  console.log(err);
  process.exit(1);
});
