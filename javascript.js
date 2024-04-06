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


function operate(firstNum, operator, secondNum) {
    operator === '+' ? addition(firstNum, secondNum):
    operator === '-' ? subtraction(firstNum, secondNum):
    operator === 'x' ? multiplication(firstNum, secondNum):
    operator === '/' ? division(firstNum, secondNum):
    operator === '%' ? remainder(firstNum, secondNum):
                        'Nan';
}


//Add button functionality for numbers
let btn = document.querySelectorAll(".numbers");
let output = document.querySelector(".results");

btn.forEach(button => {
    button.addEventListener("click", () => {
        (output.textContent === '0' || operator !== undefined) ?
            output.textContent = button.textContent :
            output.textContent += button.textContent;
    });
});

//Add button functionality for operators
let inp = document.querySelector(".userInput");

operator.forEach(button => {
    button.addEventListener("click", () => {
        firstNum = +output.textContent;
        inp.textContent = firstNum + button.textContent;
        return operator = button.textContent;
    });
});

//Add button functionality for the 'equals' button
let eql = document.querySelector("#equals");

eql.addEventListener("click", () => {
    secondNum = +output.textContent;
    inp.textContent = inp.textContent + secondNum;
    operate(firstNum, operator, secondNum);
    output.textContent = result;
});
