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

let firstNum = document.querySelectorAll(".numbers"); // Are these three queries really needed?
let operator = document.querySelectorAll(".operators");
let secondNum;

function operate(firstNum, operator, secondNum) {
    operator === '+' ? addition(firstNum, secondNum):
    operator === '-' ? subtraction(firstNum, secondNum):
    operator === '*' ? multiplication(firstNum, secondNum):
    operator === '/' ? division(firstNum, secondNum):
    operator === '%' ? remainder(firstNum, secondNum):
    '';
}


//Add button functionality for numbers
let btn = document.querySelectorAll(".numbers");
let result = document.querySelector(".results");

btn.forEach(button => {
    button.addEventListener("click", () => {
        (result.textContent === '0' || firstNum !== undefined) ?
            result.textContent = button.textContent :
            result.textContent += button.textContent;
    });
});

//Add button functionality for operators
let inp = document.querySelector(".userInput");

operator.forEach(button => {
    button.addEventListener("click", () => {
        firstNum = +result.textContent;
        inp.textContent = firstNum + button.textContent;
    });
});

//Add button functionality for the 'equals' button
let eql = document.querySelector("#equals");

eql.addEventListener("click", () => {
    
    secondNum = +result.textContent;
    inp.textContent = inp.textContent + secondNum;
    operate();
    result.textContent = firstNum + secondNum;
});
