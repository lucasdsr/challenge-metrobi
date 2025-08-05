/*
  4) Write an efficient method that tells us whether or not an input string brackets ("{", "}",
  "(", ")", "[", "]") opened and closed properly. Example: “{[]}” => true, “{(])}” => false,
  “{([)]}” => false
*/

function verifyBrackets(text) {
  const openBrackets = ["(", "[", "{"];
  const closeBrackets = [")", "]", "}"];

  const textBrackets = [];

  for (const str of text) {
    const lastBracket = textBrackets[textBrackets.length - 1];

    if (openBrackets.includes(str)) {
      textBrackets.push(str);
    } else if (closeBrackets.includes(str)) {
      if (
        (str === ")" && lastBracket === "(") ||
        (str === "]" && lastBracket === "[") ||
        (str === "}" && lastBracket === "{")
      ) {
        textBrackets.pop();
      } else return false;
    }
  }

  console.log("textBrackets:", textBrackets);

  return !textBrackets.length;
}

function main() {
  const isValid = verifyBrackets("{([)]}");

  console.log("valid:", isValid);
}

main();
