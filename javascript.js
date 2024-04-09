let Num1;
let Num2;
let currentOperator;
let result;
let roundedResult

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
    roundedResult = +result.toLocaleString();
    output.textContent = roundedResult;
    divideByZero()                               
    undefineMainVariables(); 
}


//Add functionality for number buttons
let output = document.querySelector(".output");

function numberBtn(number) {
    if (number === "." && output.textContent.includes(".")) return
    if (+output.textContent === 0 || +output.textContent === roundedResult) { 
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
    currentOperator = operator;
    console.log(`currentOperator = ${currentOperator}`);
    console.log(`Num1 = ${Num1}`);
    console.log(`Num2 = ${Num2}`);

    // For the starting operation
    if (Num1 === undefined && result === undefined) { 
        Num1 = +output.textContent;
        input.textContent = `${output.textContent} ${operator} `;
        output.textContent = "0";

    // For pressing an operator button immediately after a result is displayed (num+num=result => +)
    } else if (Num1 === undefined && Num2 === undefined && result !== undefined) {
        Num1 = roundedResult;
        console.log(`Num1 = ${Num1}`);
        console.log(`Num2 = ${Num2}`);
        input.textContent = `${output.textContent} ${operator} `;
    } else if (Num1 === undefined && result !== undefined) {
        Num1 = roundedResult;
        console.log(`Num1 = ${Num1}`);
        console.log(`Num2 = ${Num2}`);
        // For consecutive operations ( + => + => + => +)
        if (operator1 === currentOperator && operator2 === currentOperator ) {
            compute(Num1, operator, Num2);
            input.textContent = `${roundedResult} ${operator} `;
            output.textContent = roundedResult;
        } else if (operator1 === currentOperator && operator2 !== currentOperator ) {
            compute(Num1, operator2, Num2);
            input.textContent = `${roundedResult} ${operator1} `;
            output.textContent = roundedResult;
        } else if (operator2 === currentOperator && operator1 !== currentOperator ) {
            compute(Num1, operator1, Num2);
            input.textContent = `${roundedResult} ${operator2} `;
            output.textContent = roundedResult;
        }
    } else {
        equalsBtn();
    }
}


//Add functionality for the '=' button
function equalsBtn() {
    if (+output.textContent === 0) return     // Prevents function from running
    // operator1 = undefined;
    // operator2 = undefined;
    Num2 = +output.textContent;
    console.log(`Num1 = ${Num1}`);
    console.log(`Num2 = ${Num2}`);
    input.textContent += `${output.textContent} =`;
    compute(Num1, currentOperator, Num2);
    // Maybe undefine result too?
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
// 1. input display not showing the correct operating when changing operators
// 2. multiplication and division not working in string operations
// 3. remainder operation not working properly