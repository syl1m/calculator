const numberBtns = document.querySelectorAll('.number');
const addBtn = document.querySelector('.add');
const subtractBtn = document.querySelector('.subtract');
const multiplyBtn = document.querySelector('.multiply');
const divideBtn = document.querySelector('.divide');
const equalBtn = document.querySelector('.equals');
const modBtn = document.querySelector('.MOD');
const clearBtn = document.querySelector('.AC');
const signChangeBtn = document.querySelector('.sign_change');
const deleteBtn = document.querySelector('.DEL');
const decimalBtn = document.querySelector('.decimal');
const currentDisplay = document.querySelector('.current');
const historyDisplay = document.querySelector('.history');

let firstOperand = "",
    secondOperand = "",
    operator = "",
    operatorSign = "",
    numArray = [];

numberBtns.forEach(numberBtn => numberBtn.addEventListener('click',getNumber));
equalBtn.addEventListener('click', evaluate);
decimalBtn.addEventListener('click',addDecimal);

addBtn.addEventListener('click',(e) => setOperator(e, add));
subtractBtn.addEventListener('click',(e) => setOperator(e, subtract));
multiplyBtn.addEventListener('click',(e) => setOperator(e, multiply));
divideBtn.addEventListener('click',(e) => setOperator(e, divide));
modBtn.addEventListener('click',(e) => setOperator(e, modulus));

clearBtn.addEventListener('click',clearAll);
signChangeBtn.addEventListener('click',signChange);
deleteBtn.addEventListener('click',backspace);

function addDecimal(e) {
    if (numArray.some(element => element === ".")) return
    getNumber(e);
}

function backspace() {
    if (firstOperand !== "") {
        if (operator && (secondOperand !== "")) {
            numArray.pop();
            if (numArray.length === 0 || (numArray.length === 1 && numArray[0] === "-")) {
                secondOperand = "";
                numArray = [];
                displayCurrent();
            } else {
                const numString = numArray.join("");
                secondOperand = numString;
                displayCurrent(secondOperand);
            }
        } else if (operator) {
            operator = "";
            operatorSign = "";
            displayHistory();
        } else if (numArray.length !== 0) {
            numArray.pop();
            if (numArray.length === 0 || (numArray.length === 1 && numArray[0] === "-")) {
                firstOperand = "";
                numArray = [];
                displayCurrent();
            } else {
                const numString = numArray.join("");
                firstOperand = numString;
                displayCurrent(firstOperand);
            }
        }
    }
}

function signChange() {
    if (firstOperand !== "") {
        if (!operator) {
            firstOperand = -firstOperand;
            displayCurrent(firstOperand);
        } else if (secondOperand) {
            secondOperand = -secondOperand;
            displayCurrent(secondOperand);
        };
        if (numArray.length !== 0) (numArray[0] !== "-") ? numArray.unshift("-") : numArray.shift();
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
        if (numArray.length !== 0) numArray = [];
        displayHistory();
    } else {
        return;
    }
} 

function evaluate() {
    if (operator && (firstOperand !== "") && (secondOperand !== "")) {
        let result = (operate(operator, firstOperand, secondOperand));
        if (!Number.isInteger(result)) result = +result.toFixed(5); // result is displayed up to 5 decimal points
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
    if (numArray.length < 15) {
        numArray.push(e.target.innerText);
        if (numArray[0] === "0" && numArray[1] !== "." && numArray.length > 1) numArray.splice(0,1); // remove leading zeros
        const numString = numArray.join("");
        displayCurrent(numString);
        if (operator) {
            secondOperand = numString;
        } else {
            firstOperand = numString; 
        };
    }
}

function displayCurrent(numString) {
    currentDisplay.textContent = numString;
}

function displayHistory() {
    historyDisplay.textContent = `${firstOperand} ${operatorSign} ${secondOperand}`;
}

function add(x, y) {
    return Number(x) + Number(y);
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