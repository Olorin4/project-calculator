// Addition start

function addition(arr) {
    return arr.reduce((accumulator, current) => accumulator + current , 0);
}

let result = addition([1, 2, 3, 4, 5]);