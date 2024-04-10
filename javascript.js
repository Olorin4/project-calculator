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
    roundedResult = parseFloat(result.toFixed(3));
    output.textContent = roundedResult;
    divideByZero()                               
}


//Add functionality for number buttons
let output = document.querySelector(".output");

document.querySelectorAll(".numbers").forEach(button => {
    button.addEventListener("click", () => {
        numberBtn(button.textContent);
    });
});

function numberBtn(number) {
    if (number === "." && output.textContent.includes(".")) return
    if (+output.textContent === 0 || +output.textContent === roundedResult) { 
        output.textContent = number;
    } else {
        output.textContent += number;
    }   
}


//Add functionality for operator buttons
let input = document.querySelector(".input");
let isAssigningToOperator = true; // Flag variable to alternate assignments between the two operators
let operator1;
let operator2;

document.querySelectorAll(".operators").forEach(button => {
    button.addEventListener("click", () => {
        (isAssigningToOperator) ?
            (operator1 = button.innerText) :              // Alternate with each click
            (operator2 = button.innerText) ;
        isAssigningToOperator = !isAssigningToOperator; // Toggle the flag variable for the next click
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

    // For the starting operation ( num => + )
    if (Num1 === undefined && result === undefined) {
        Num1 = +output.textContent;
        input.textContent = `${output.textContent} ${operator} `;
        output.textContent = "0";

    // For pressing an operator button immediately after a result is displayed (num+num=result => +)
    } else if (Num1 === undefined && result !== undefined) {
        Num1 = result;
        console.log(`Num1 = ${Num1}`);
        console.log(`Num2 = ${Num2}`);
        input.textContent = `${output.textContent} ${operator} `;

    // For the first string operation ( num + num => + )
    } else if (Num2 === undefined && result === undefined) {
        Num2 = +output.textContent;
        console.log(`Num2 = ${Num2}`);
        selectOperator(operator1, currentOperator, operator2);
       
    // For the second string operation ( num + num + num => + )
    } else if (Num2 === undefined && result !== undefined) {
        Num1 = result;
        Num2 = +output.textContent;
        console.log(`Num1 = ${Num1}`);
        console.log(`Num2 = ${Num2}`);
        selectOperator(operator1, currentOperator, operator2);
    }
}

function selectOperator(operator1, currentOperator, operator2) {
    if (operator1 === currentOperator && operator2 === currentOperator) {
        compute(Num1, currentOperator, Num2);
        input.textContent = `${roundedResult} ${currentOperator} `;
    } else if (operator1 === currentOperator && operator2 !== currentOperator) {
        compute(Num1, operator2, Num2);
        input.textContent = `${roundedResult} ${operator1} `;
    } else if (operator2 === currentOperator && operator1 !== currentOperator) {
        compute(Num1, operator1, Num2);
        input.textContent = `${roundedResult} ${operator2} `;
    }
    Num2 = undefined;
}


//Add functionality for the '=' button
document.querySelector("#equals").addEventListener("click", equalsBtn);

function equalsBtn() {
    if (+output.textContent === 0) return     // Prevents function from running
    if (Num1 !== roundedResult && roundedResult !== undefined) {
        Num1 = result;
    }
    Num2 = +output.textContent;
    console.log(`Num1 = ${Num1}`);
    console.log(`Num2 = ${Num2}`);
    input.textContent += `${output.textContent} =`;
    compute(Num1, currentOperator, Num2);
    Num1 = undefined;
    Num2 = undefined;
}


// Add functionality for the AC button
document.querySelector("#AC").addEventListener("click", clearBtn);

function clearBtn() {
    output.textContent = 0;
    input.textContent = " ";
    Num1 = undefined;
    Num2 = undefined;
    currentOperator = undefined;
    operator1 = undefined;
    operator2 = undefined;
    result = undefined;
    roundedResult = undefined;
}


// Add functionality for the Backspace button
document.querySelector("#backspace").addEventListener("click", () => {
    backspaceBtn(output.innerText);
});

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


// Display an error message if the user tries to divide by 0
function divideByZero() {
    if (operator1 === "/" && Num2 === 0) {
        alert("ERROR! Don't you know you can't divide by 0? Pff...");
        clearBtn();
    }
}

// Add functionality for the "+/-" button 
document.querySelector("#sign").addEventListener("click", () => {
    signBtn();
});

function signBtn() {
    (+output.textContent === 0) ? output.textContent = "-" :
        (output.textContent === "-") ? output.textContent = "0" :
            (+output.textContent > 0) ? output.textContent = `-${output.textContent}` :
                (+output.textContent < 0) ? output.textContent = -(+output.textContent) :
                null;
}

// Issues to fix:
// 1. roundedResult above 1000 is Nan because of the thousand separator (produced by the toLocaleString)
// 2. When the first string operation is like this ( num + num => - ) the wrong operator is used.