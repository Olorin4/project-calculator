// Addition
// function addition(arr) {
//     return arr.reduce((accumulator, current) => accumulator + current , 0);
// }
function addition(a, b) {
    return a + b;
}

function subtraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}

function remainder(a, b) {
    return a % b;
}

let firstNum;
let operator;
let secondNum;

function operate(firstNum, operator, secondNum) {
    operator === '+' ? addition(firstNum, secondNum):
    operator === '-' ? subtraction(firstNum, secondNum):
    operator === '*' ? multiplication(firstNum, secondNum):
    operator === '/' ? division(firstNum, secondNum):
    operator === '%' ? remainder(firstNum, secondNum):
    '';
}


//Add button functionality
let btn = document.querySelectorAll("button");
let rlt = document.querySelector(".result");

btn.forEach(button => {
    button.addEventListener("click", () => {
        rlt.textContent = button.textContent;
    });
});


