let Num1;
let Num2;
let currentOperator;
let result;

function compute(a, operator, b) {
    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "x":
            result = a * b;
            break;
        case "/":
            result = a / b;
            break;
        case "%":
            result = a % b;
            break;
        default:
            return
    }
    output.textContent = result.toLocaleString();
}


//Add functionality for number buttons
let output = document.querySelector(".output");

function numberBtn(number) {
    if (number === "." && output.textContent.includes(".")) return
    if (+output.textContent === 0 || +output.textContent === result) { 
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
let isAssigningToOperator1 = true; // Flag variable to alternate assignments between the two operators
let operator1;
let operator2;

document.querySelectorAll(".operators").forEach(button => {
    button.addEventListener("click", () => {
        (isAssigningToOperator1) ?
            (operator1 = button.innerText) :              // Alternate with each click
            (operator2 = button.innerText) ;
        isAssigningToOperator1 = !isAssigningToOperator1; // Toggle the flag variable for the next click
        console.log(`operator1 = ${operator1}`);
        console.log(`operator2 = ${operator2}`);
        operatorBtn(button.innerText);
    });
});

function operatorBtn(operator) {
    if (+output.textContent === 0) return
    console.log(`Num1 = ${Num1}`);
    console.log(`Num2 = ${Num2}`);
    if (Num1 === undefined && result === undefined) {
        currentOperator = operator;
        console.log(`currentOperator = ${currentOperator}`);
        Num1 = +output.textContent;
        input.textContent = `${output.textContent} ${operator} `;
        output.textContent = "0"; 
    } else if (Num1 === undefined && result !== undefined) {
        if (Num1 === undefined) {
            Num1 = result;
            Num2 = +output.textContent;
            console.log(`Num1 = ${Num1}`);
            console.log(`Num2 = ${Num2}`);
            if (operator1 !== operator) {
                compute(Num1, operator1, Num2);
                input.textContent = `${result} ${operator1} `;
                output.textContent = result;
            } else {
                compute(Num1, operator2, Num2);
                input.textContent = `${result} ${operator2} `;
                output.textContent = result;
            }
            divideByZero()
            undefineMainVariables();
        }
    } else {
        equalsBtn();
    }
}


//Add functionality for the '=' button
function equalsBtn() {
    if (+output.textContent === 0) return         // Prevents function from running 
    Num2 = +output.textContent;
    console.log(`Num2 = ${Num2}`);
    input.textContent += `${output.textContent} =`;
    if (operator1 !== undefined) {
        compute(Num1, operator1, Num2);
    } else {
        compute(Num1, operator2, Num2);
    }
    divideByZero()
    undefineMainVariables();
}

document.querySelector("#equals").addEventListener("click", equalsBtn);


// Add functionality for the AC button
function clearBtn() {
    output.textContent = 0;
    input.textContent = " ";
    undefineMainVariables()
    operator1 = undefined;
    operator2 = undefined;
    result = undefined;
}

document.querySelector("#AC").addEventListener("click", clearBtn);


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
    backspaceBtn(output.innerText);
});


// Display an error message if the user tries to divide by 0
function divideByZero() {
    if (operator1 === "/" && Num2 === 0) {
        alert("ERROR! Don't you know you can't divide by 0? Pff...");
        clearBtn();
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


function undefineMainVariables() {
    Num1 = undefined;
    Num2 = undefined;
    currentOperator = undefined;
    // operator1 = undefined;
    // operator2 = undefined;
    // result = undefined;
}





// Issues to fix:
// 1. Users should be able to string together several operations
// 2. Pressing = before entering all of the numbers or an operator could cause problems!
// 3. Add keyboard support!