const numberBtns = document.querySelectorAll('.number');
const addBtn = document.querySelector('.add');
const subtractBtn = document.querySelector('.subtract');
const multiplyBtn = document.querySelector('.multiply');
const divideBtn = document.querySelector('.divide');
const equalBtn = document.querySelector('.equals');
const currentDisplay = document.querySelector('.current');

let firstOperand,
    secondOperand,
    operator,
    numArray = [];

numberBtns.forEach(numberBtn => numberBtn.addEventListener('click',getNumber));
equalBtn.addEventListener('click', evaluate);

addBtn.addEventListener('click',() => setOperator(add));
//subtractBtn.addEventListener('click',() => operator = subtract);
//multiplyBtn.addEventListener('click',() => operator = multiply);
//divideBtn.addEventListener('click',() => operator = divide);

function setOperator(operatorFn) {
    if (operator) evaluate();
    operator = operatorFn;
    if (numArray) numArray = [];
} 

function evaluate() {
    if (operator && firstOperand && secondOperand) {
        let result = (operate(operator, firstOperand, secondOperand));
        displayCurrent(result);
        firstOperand = result,
        secondOperand = "",
        operator = "",
        numArray = [];
    }
}

function getNumber(e) {
    numArray.push(e.target.innerText);
    const number = Number(numArray.join(""));
    displayCurrent(number);
    if (operator) {
        return secondOperand = number;
    } else {
        return firstOperand = number; 
    };
}

function displayCurrent(number) {
    currentDisplay.textContent = number;
} 

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
    return operator(x, y);
}