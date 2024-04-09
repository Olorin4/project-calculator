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

function numberBtn(number) {
    if (number === "." && output.textContent.includes(".")) return
    if (+output.textContent === 0 || result !== undefined) { 
        output.textContent = number;
    } else {
        output.textContent += number;
    }   
}

document.querySelectorAll(".numbers").forEach(button => {
    button.addEventListener("click", () => {
        numberBtn(button.textContent);
    });
});


//Add functionality for operator buttons
let input = document.querySelector(".input");

function operatorBtn(operator) {
    if (+output.textContent === 0) return
    currentOperator = operator;
    Num1 = +output.textContent;
    input.textContent = `${Num1} ${operator} `;
    output.textContent = ""; 
}

document.querySelectorAll(".operators").forEach(button => {
    button.addEventListener("click", () => {
        operatorBtn(button.textContent);
    });
});

//Add functionality for the '=' button
function equalsBtn() {
    if (+output.textContent === 0) return
    Num2 = +output.textContent;
    input.textContent += `${Num2} =`;
    result = operate(Num1, currentOperator, Num2);
    output.textContent = result.toLocaleString();
    Num1 = undefined;
    Num2 = undefined;
    currentOperator = undefined;
    result = undefined;
    divideByZero()
}

document.querySelector("#equals").addEventListener("click", equalsBtn);


// Add functionality for the AC button
function cancelBtn() {
    output.textContent = 0;
    input.textContent = " ";
    Num1 = undefined;
    Num2 = undefined;
    currentOperator = undefined;
    result = undefined;
}

document.querySelector("#AC").addEventListener("click", cancelBtn);


// Add functionality for the Backspace button
function backspaceBtn(number) {
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
    backspaceBtn(output.textContent);
});


// Display an error message if the user tries to divide by 0
function divideByZero() {
    if (currentOperator = "/" && Num2 === 0) {
        alert("ERROR! Don't you know you can't divide by 0? Pff...");
        cancelBtn();
    }
}

// Add +/- button functionality
function signBtn() {
    (+output.textContent === 0) ? output.textContent = "-" :
        (output.textContent === "-") ? output.textContent = "0" :
            (+output.textContent > 0) ? output.textContent = `-${output.textContent}` :
                (+output.textContent < 0) ? output.textContent = -(+output.textContent) :
                null;
}

document.querySelector("#sign").addEventListener("click", () => {
    signBtn();
});





// Issues to fix:
// 1. Users should be able to string together several operations
// 2. Pressing = before entering all of the numbers or an operator could cause problems!
// 3. Add keyboard support!