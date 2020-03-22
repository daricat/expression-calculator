function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] == '*' || arr[j] == '/' || arr[j] == '+' || arr[j] == '-' || arr[j] == '(' || arr[j] == ')') {
      if ((arr.includes('*' || '-', (j))) === false) {
        arr.splice((j + 1), (arr.length - 1 - j), (arr[j + 1] + arr[arr.length - 1]));
        break;
      }

      for (let k = j - 1; k >= 0; k--) {
        if (k == 0) {
          arr.splice(k, j, (arr[k] + arr[j - 1]));
          break;
        }
        if (arr[k] == '*' || arr[k] == '/' || arr[k] == '+' || arr[k] == '-' || arr[k] == '(' || arr[k] == ')') {
          let a = k + 1;
          let b = j - k - 1;
          arr.splice(a, b, (arr[k + 1] + arr[j - 1]));
          break;
        }

      }
    }
  }
  console.log(arr, arr.indexOf(arr[1]));
    
    // Я ДОРЕШАЮ!!!
    
}

module.exports = {
    expressionCalculator
}