// Addition
// function addition(arr) {
//     return arr.reduce((accumulator, current) => accumulator + current , 0);
// }
let result;

function addition(a, b) {
    return result = a + b;
}

function subtraction(a, b) {
    return result = a - b;
}

function multiplication(a, b) {
    return result = a * b;
}

function division(a, b) {
    return result = a / b;
}

function remainder(a, b) {
    return result = a % b;
}

let firstNum = document.querySelectorAll(".numbers"); // Are these three queries really needed?
let operator = document.querySelectorAll(".operators");
let secondNum;

//Add button functionality for number buttons
let btn = document.querySelectorAll(".numbers");
let output = document.querySelector(".output");

btn.forEach(button => {
    button.addEventListener("click", () => {
        if (+output.textContent === 0) { 
            output.textContent = button.textContent;
        } else {
            output.textContent += button.textContent;
        }   
    });
});

//Add button functionality for operators
let input = document.querySelector(".input");

operator.forEach(button => {
    button.addEventListener("click", () => {
        firstNum = +output.textContent;
        input.textContent = firstNum + " " + button.textContent;
        output.textContent = "";
        return operator = button.textContent;
    });
});

//Add button functionality for the 'equals' button
let eql = document.querySelector("#equals");

eql.addEventListener("click", () => {
    secondNum = +output.textContent;
    input.textContent = `${input.textContent}  ${secondNum}`;
    operate(firstNum, operator, secondNum);
    output.textContent = result;
    firstNum = result;
});

function operate(firstNum, operator, secondNum) {
    switch (operator) {
        case "+":
            result = firstNum + secondNum;
            break;
        case "-":
            result = firstNum - secondNum;
            break;
        case "x":
            result = firstNum * secondNum;
            break;
        case "/":
            result = firstNum / secondNum;
            break;
        case "%":
            result = firstNum % secondNum;
            break;
    }
}

// Issues to fix:
// 1. place comma to thousand numbers
// 2. 
