var inputNumber = prompt('Введите число');

if (!isNaN(inputNumber)) {
    if (inputNumber < 1000) {
        var numberObject = {
            ones: inputNumber % 10,
            tens: Math.floor(inputNumber/10) % 10,
            hundreds: Math.floor(inputNumber/100) % 10,
        };
        console.log(JSON.stringify(numberObject));
    } else {
        console.log('Число больше 999');
    }
} else {
    console.log('Не число');
}