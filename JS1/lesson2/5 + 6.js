function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function mathOperation(arg1, arg2, operation) {
    switch(operation) {
        case 'add':
            return add(arg1, arg2);
            break;
        case 'substract':
            return substract(arg1, arg2);
            break;
        case 'multiply':
            return multiply(arg1, arg2);
            break;
        case 'divide':
            return divide(arg1, arg2);
            break;
    }
}

alert(mathOperation(5, 2, 'substract'));