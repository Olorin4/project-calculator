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


let Num1;
let currentOperator;
let Num2;


//Add functionality for number buttons
let output = document.querySelector(".output");

function updateOutput(value) {
    if (+output.textContent === 0 || result !== undefined) { 
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


//Add functionality for operator buttons
let input = document.querySelector(".input");

function handleOperatorClick(operator) {
    Num1 = +output.textContent;
    input.textContent = `${Num1} ${operator} `;
    output.textContent = "";
    currentOperator = operator;
    Num2 = undefined;
    result = undefined;
}

document.querySelectorAll(".operators").forEach(button => {
    button.addEventListener("click", () => {
        handleOperatorClick(button.textContent);
    });
});


//Add functionality for the '=' button
function handleEqualsClick() {
    Num2 = +output.textContent;
    input.textContent += `${Num2} =`;
    result = operate(Num1, currentOperator, Num2);
    output.textContent = result.toLocaleString(); // thousands separator and rounding decimals
    Num1 = result;
    currentOperator = undefined;
    divideByZero()
}

document.querySelector("#equals").addEventListener("click", handleEqualsClick);


// Add functionality for the AC button
function cancelButton() {
    output.textContent = 0;
    input.textContent = " ";
    Num1 = undefined;
    Num2 = undefined;
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


// Display an error message if the user tries to divide by 0
function divideByZero() {
    if (currentOperator = "/" && Num2 === 0) {
        alert("ERROR! Don't you know you can't divide by 0? Pff...");
        cancelButton();
    }
}

// Add +/- button functionality
document.querySelector("#sign").addEventListener("click", () => {
    placeSign();
});

function placeSign() {
    (+output.textContent === 0) ? output.textContent = "-" :
        (+output.textContent > 0) ? output.textContent = `-${output.textContent}` :
            (+output.textContent < 0) ? output.textContent = -(+output.textContent) :
                null;
}




// Issues to fix:
// 1. Users should be able to string together several operations
// 2. Pressing = before entering all of the numbers or an operator could cause problems!
// 3. Add keyboard support!