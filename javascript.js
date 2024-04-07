let result;

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
        default:
            return NaN; // Handle invalid operator
    }
}

let firstNum;
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
        input.textContent = firstNum + " " + button.textContent + " ";
        output.textContent = "";
        return operator = button.textContent;
    });
});

//Add button functionality for the 'equals' button
document.querySelector("#equals").addEventListener("click", () => {
    secondNum = +output.textContent;
    input.textContent += `${secondNum} =`;
    operate(firstNum, operator, secondNum);
    output.textContent = result.toLocaleString(); // thousands separator and rounding decimals
    firstNum = result;
    operator = undefined;
});

// Add functionality for the AC button
document.querySelector("#AC").addEventListener("click", () => {
    output.textContent = 0;
    input.textContent = " ";
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
});

// Add functionality for the backspace button
// let backSpace = document.querySelector("#bksp");

// cancelBtn.addEventListener("click", () => {
//     output.textContent = 
// });



// Issues to fix:
// 1. Users should be able to string together several operations
// 2. round answers with long decimals = DONE!
// 3. Display a snarky error message if the user tries to divide by 0
// 4. Pressing = before entering all of the numbers or an operator could cause problems!
// 5. Add keyboard support!
