const numberBtns = document.querySelectorAll('.number');
const currentDisplay = document.querySelector('.current');
let displayValue;
let numArray = [];

numberBtns.forEach(numberBtn => numberBtn.addEventListener('click',getNumber));


function getNumber(e) {
    numArray.push(e.target.innerText);
    displayCurrent(Number(numArray.join("")));
}

function displayCurrent(number) {
    currentDisplay.textContent = number;
    return displayValue = number; 
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
    return operator(x, y)
}