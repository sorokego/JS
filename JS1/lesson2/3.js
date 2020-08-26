function createNumber() {
    var number;
    number = Math.round(Math.random() * Math.pow(10,  Math.round(Math.random()*5)));
    //set positive/negative
    number = number * Math.pow(-1, Math.round(Math.random() * 10));
    return number;
}

var a = createNumber();
var b = createNumber();

var answer;

if (a>=0 && b>=0) {
    if (a > b) {
        answer = a-b;
    } else {
        answer = b-a;
    }
} else if (a<0 && b<0) {
    answer = a * b;
} else {
    answer = a + b;
}

alert('Исходные числа: a = ' + a + ', b = ' + b + '. Результат: ' + answer);