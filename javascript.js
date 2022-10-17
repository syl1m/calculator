function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function modulus(x, y) {
    return x % y;
}

function operate(operator, x, y) {
    return operator(x, y)
}

/* testing
let x = 10, y=3;
console.log(operate(add,x,y));
console.log(operate(subtract,x,y));
console.log(operate(multiply,x,y));
console.log(operate(divide,x,y));
console.log(operate(modulus,x,y));
*/