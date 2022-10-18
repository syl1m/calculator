const numberBtns = document.querySelectorAll('.number');
const addBtn = document.querySelector('.add');
const subtractBtn = document.querySelector('.subtract');
const multiplyBtn = document.querySelector('.multiply');
const divideBtn = document.querySelector('.divide');
const equalBtn = document.querySelector('.equals');
const modBtn = document.querySelector('.MOD');
const clearBtn = document.querySelector('.AC');
const signChangeBtn = document.querySelector('.sign_change');
const currentDisplay = document.querySelector('.current');
const historyDisplay = document.querySelector('.history');

let firstOperand = "",
    secondOperand = "",
    operator = "",
    operatorSign = "",
    numArray = [];

numberBtns.forEach(numberBtn => numberBtn.addEventListener('click',getNumber));
equalBtn.addEventListener('click', evaluate);

addBtn.addEventListener('click',(e) => setOperator(e, add));
subtractBtn.addEventListener('click',(e) => setOperator(e, subtract));
multiplyBtn.addEventListener('click',(e) => setOperator(e, multiply));
divideBtn.addEventListener('click',(e) => setOperator(e, divide));
modBtn.addEventListener('click',(e) => setOperator(e, modulus));

clearBtn.addEventListener('click',clearAll);
signChangeBtn.addEventListener('click',signChange);

function signChange() {
    if (firstOperand !== "") {
        if (!operator) {
            firstOperand = -firstOperand;
            displayCurrent(firstOperand);
        } else if (secondOperand) {
            secondOperand = -secondOperand;
            displayCurrent(secondOperand);
        };
    }
}

function clearAll() {
    firstOperand = "",
    secondOperand = "",
    operator = "",
    operatorSign = "",
    numArray = [];
    displayCurrent();
    displayHistory();
}

function setOperator(e, operatorFn) {
    if (firstOperand !== "") {
        if (operator) evaluate();
        operator = operatorFn;
        operatorSign = e.target.innerText;
        if (numArray) numArray = [];
        displayHistory();
    } else {
        return;
    }
} 

function evaluate() {
    if (operator && (firstOperand !== "") && (secondOperand !== "")) {
        const result = (operate(operator, firstOperand, secondOperand));
        displayCurrent(result);
        historyDisplay.textContent = `${firstOperand} ${operatorSign} ${secondOperand} = `;
        firstOperand = result,
        secondOperand = "",
        operator = "",
        operatorSign = "",
        numArray = [];
    }
}

function getNumber(e) {
    numArray.push(e.target.innerText);
    const number = Number(numArray.join(""));
    displayCurrent(number);
    if (operator) {
        secondOperand = number;
    } else {
        firstOperand = number; 
    };
}

function displayCurrent(number) {
    currentDisplay.textContent = number;
}

function displayHistory() {
    historyDisplay.textContent = `${firstOperand} ${operatorSign} ${secondOperand}`;
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