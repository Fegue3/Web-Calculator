let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.btn');


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.dataset.number) {
            appendNumber(button.dataset.number);
        } else if (button.dataset.action) {
            handleAction(button.dataset.action);
        }
    });
});


function appendNumber(number) {
    if (shouldResetDisplay) {
        resetDisplay();
    }
    if (display.textContent === '0' && number !== '.') {
        display.textContent = number;
    } else {
        display.textContent += number;
    }
}

function handleAction(action) {
    switch (action) {
        case 'clear':
            clearCalculator();
            break;
        case 'backspace':
            deleteLastDigit();
            break;
        case 'percent':
            applyPercentage();
            break;
        case 'add':
        case 'substract':
        case 'multiply':
        case 'divide':
            setOperator(action);
            break;
        case 'equals':
            evaluate();
            break;
        case 'sign':
            toggleSign();
            break;
        default:
            break;
    }
}

function clearCalculator() {
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    shouldResetDisplay = false;
    display.textContent = '0';
}

function deleteLastDigit() {
    display.textContent = display.textContent.slice(0, -1) || '0';
}

function applyPercentage() {
    display.textContent = (parseFloat(display.textContent) / 100).toString();
}

function setOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstOperand = display.textContent;
    currentOperator = operator;
    display.textContent = `${firstOperand} ${getOperatorSymbol(operator)}`;
    shouldResetDisplay = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    secondOperand = display.textContent;
    display.textContent = operate(currentOperator, parseFloat(firstOperand), parseFloat(secondOperand));
    currentOperator = null;
    shouldResetDisplay = true;
}

function toggleSign() {
    display.textContent = (parseFloat(display.textContent) * -1).toString();
}

function resetDisplay() {
    display.textContent = '';
    shouldResetDisplay = false;
}


function operate(operator, num1, num2) {
    switch (operator) {
        case 'add':
            return (num1 + num2).toString();
        case 'substract':
            return (num1 - num2).toString();
        case 'multiply':
            return (num1 * num2).toString();
        case 'divide':
            return num2 === 0 ? 'Error' : (num1 / num2).toString();
        default:
            return null;
    }
}

function getOperatorSymbol(operator) {
    switch (operator) {
        case 'add':
            return '+';
        case 'substract':
            return '-';
        case 'multiply':
            return '×';
        case 'divide':
            return '÷';
        default:
            return '';
    }
}
