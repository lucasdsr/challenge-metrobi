/**
 * Question 4)
 *
 * Write an efficient method that tells us whether or not an input string brackets ("{", "}",
 * "(", ")", "[", "]") opened and closed properly. Example: “{[]}” => true, “{(])}” => false,
 * “{([)]}” => false
 *
 *  */

function verifyBrackets(str: string) {
  const stack = [] as Array<string>;

  const bracketMap = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  const openingBrackets = new Set(["(", "{", "["]);

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (openingBrackets.has(char)) {
      stack.push(char);
    } else if (bracketMap[char]) {
      if (stack.length === 0) {
        return false;
      }

      const lastOpenBracket = stack.pop();

      if (lastOpenBracket !== bracketMap[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

function main() {
  const isValid = verifyBrackets("{()}");

  console.log("valid:", isValid);
}

main();
