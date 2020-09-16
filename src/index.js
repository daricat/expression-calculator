function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(str) {
  if (/[()]/.test(str)) {
    let brackets = str.match(/[()]/g).join("");
    while (brackets.includes("()") === true) {
      brackets = brackets.replace("()", "");
    }
    if (brackets.length !== 0) {
      throw new Error("ExpressionError: Brackets must be paired");
    }
  }

  str = str.match(/[[0-9]+|[+\-*/()]/g);

  let postfixExpresison = transformInPostfix(str);

  let result = postfixExpresison
    .reduce((accumulator, element) => {
      let ints;
      switch (true) {
        case !isNaN(element):
          accumulator.push(element);
          break;
        case /[+\-*/]/.test(element):
          switch (element) {
            case "+":
              ints = accumulator.splice(-2);
              accumulator.push(Number(ints[0]) + Number(ints[1]));
              break;
            case "-":
              ints = accumulator.splice(-2);
              accumulator.push(Number(ints[0]) - Number(ints[1]));
              break;
            case "*":
              ints = accumulator.splice(-2);
              accumulator.push(Number(ints[0]) * Number(ints[1]));
              break;
            case "/":
              ints = accumulator.splice(-2);
              if (Number(ints[1]) === 0) {
                throw new TypeError("TypeError: Division by zero.");
              } else {
                accumulator.push(Number(ints[0]) / Number(ints[1]));
              }
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
      return accumulator;
    }, [])[0];
    return result;
}

function transformInPostfix(str) {
  let stack = [];
  let postfixExpresison = str.reduce((accumulator, element) => {
    switch (true) {
    case !isNaN(element):
      accumulator.push(element);
      break;
    case /[+-]/.test(element):
      if (stack.length === 0 || stack[stack.length - 1] === "(") {
        stack.push(element);
      } else {
        let i = stack.length - 1;
        while (i >= 0) {
          if (/[(]/.test(stack[i])) {
            break;
          } else {
            accumulator.push(stack[i]);
            stack.pop();
          }
          i -= 1;
        }
        stack.push(element);
      }
      break;
    case /[/*]/.test(element):
      if (stack.length === 0 || /[-+(]/.test(stack[stack.length - 1])) {
        stack.push(element);
      } else {
        let i = stack.length - 1;
        while (i >= 0) {
          if (!/[-+(]/.test(stack[i])) {
            accumulator.push(stack[i]);
            stack.pop();
            break;
          }
          i -= 1;
        }
        stack.push(element);
      }
      break;
    case /[(]/.test(element):
      stack.push(element);
      break;
    case /[)]/.test(element):
      let i = stack.length - 1;
      while (i >= 0) {
        if (stack[i] === "(") {
          stack.splice(i, 1);
          break;
        } else {
          accumulator.push(stack[i]);
          stack.pop();
        }
        i -= 1;
      }
      break;
    default:
      break;
    }
    return accumulator;
  }, []);
  stack.reverse().forEach((element) => postfixExpresison.push(element));
  return postfixExpresison;
}    

module.exports = {
    expressionCalculator
}