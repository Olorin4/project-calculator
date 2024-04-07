let result;

function operate(a, operator, b) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "x":
            return a * b;
        case "/":
            return a / b;
        case "%":
            return a % b;
        default:
            return NaN; // Handle invalid operator
    }
}


let firstNum;
let currentOperator;
let secondNum;


//Add button functionality for number buttons
let output = document.querySelector(".output");

function updateOutput(value) {
    if (+output.textContent === 0) { 
        output.textContent = value;
    } else {
        output.textContent += value;
    }   
}

document.querySelectorAll(".numbers").forEach(button => {
    button.addEventListener("click", () => {
        updateOutput(button.textContent);
    });
});


//Add button functionality for operator buttons
let input = document.querySelector(".input");

function handleOperatorClick(operator) {
        firstNum = +output.textContent;
        input.textContent = `${firstNum} ${operator} `;
        output.textContent = "";
        currentOperator = operator;
}

document.querySelectorAll(".operators").forEach(button => {
    button.addEventListener("click", () => {
        handleOperatorClick(button.textContent);
    });
});


//Add button functionality for the '=' button
function handleEqualsClick() {
    secondNum = +output.textContent;
    input.textContent += `${secondNum} =`;
    result = operate(firstNum, currentOperator, secondNum);
    output.textContent = result.toLocaleString(); // thousands separator and rounding decimals
    firstNum = result;
    currentOperator = undefined;
    if (currentOperator = "/" && secondNum === 0) {
        alert("ERROR! Don't you know you can't divide by 0? Pff...");
        cancelButton();
    }
}

document.querySelector("#equals").addEventListener("click", handleEqualsClick);


// Add functionality for the AC button
function cancelButton() {
    output.textContent = 0;
    input.textContent = " ";
    firstNum = undefined;
    secondNum = undefined;
    currentOperator = undefined;
    result = undefined;
}

document.querySelector("#AC").addEventListener("click", cancelButton);


// Add functionality for the Backspace button
function deleteLastDigit(number) {
    if (output.textContent.length === 1) {
        output.textContent = 0;
    } else {
        let numberString = number.toString();
        let newNumberString = numberString.slice(0, -1);
        let newNumber = parseFloat(newNumberString);
        output.textContent = newNumber;
    }
}

document.querySelector("#backspace").addEventListener("click", () => {
    deleteLastDigit(output.textContent);
});


// Display a snarky error message if the user tries to divide by 0


// Issues to fix:
// 1. Users should be able to string together several operations
// 2. Pressing = before entering all of the numbers or an operator could cause problems!
// 3. Add keyboard support!
