function generateNumber(numOfDigits) {
    var outputNumber;
    var outputNumberArray = [];
    var digit;

    if (numOfDigits > 10) {
        alert('It i imposible to create number with more than 10 different digits');
        return -1;
    } 

    for (i=0; i<numOfDigits; i++) {
        if (outputNumberArray.length == 0) {
            outputNumberArray.push(Math.floor(Math.random() * 10));
        } else {
            do {
                digit = Math.floor(Math.random() * 10);
            } while (digitAlreadyExist(digit, outputNumberArray));
            outputNumberArray.push(digit);
        }
    }

    outputNumber = '';
    for (i=0; i<outputNumberArray.length; i++) {
        outputNumber = outputNumber + outputNumberArray[i];
    }

    return(outputNumber);
}

function digitAlreadyExist (digit, numberArray) {
    for (var i=0; i<numberArray.length; i++) {
        if (numberArray[i] == digit) {
            return true;
        }
    }
    return false;
}

var DIGITS_TO_GUESS = 4;
var numberGuessed;
var attemptsCounter;
var cowsCounter;
var bullsCounter;
var answerNumberParsed;
var gussedNumberParsed;
var comparisonResult;
var userWantsToPlay = true;
var numberToGuess;

while (userWantsToPlay) {
    numberToGuess = generateNumber(DIGITS_TO_GUESS);
    console.log(numberToGuess);
    alert('Я загадал число с ' + DIGITS_TO_GUESS + ' цифрами! Можешь отгадывать.');

    numberGuessed =false;
    attemptsCounter = 0;
    while (!numberGuessed) {
        userAnswer = prompt('Ваш ответ:');
        attemptsCounter++;
        if (userAnswer === numberToGuess) {
            numberGuessed = true;
            break;
        } else {
            if (isNaN(userAnswer)) {
                alert('Ответ - число, а не текст!')
            } else {
                cowsCounter = 0;
                bullsCounter = 0;
                answerNumberParsed = userAnswer.split('');
                gussedNumberParsed = numberToGuess.split('');

                for (i = 0; i < DIGITS_TO_GUESS; i++) {
                    if (answerNumberParsed[i] === gussedNumberParsed[i]) {
                        bullsCounter++;
                    }
                    if (digitAlreadyExist(gussedNumberParsed[i], answerNumberParsed)) {
                        cowsCounter++;
                    }
                }
                
                if (userAnswer < numberToGuess) {
                    comparisonResult = 'меньше';
                } else {
                    comparisonResult = 'больше';
                }
                alert('Неправильно! Попробуйте ещё раз. Ваше число ' + comparisonResult + ', чем загаданное. Быков: ' + bullsCounter + ', коров: ' + cowsCounter);
            }
        }
    }
    startNewGame = prompt('Вы угадали! Число попыток: ' + attemptsCounter + ' Если хотите сырать снова, введите "y"');
    if (startNewGame != 'y' && startNewGame != 'Y') {
        userWantsToPlay = false;
    }
}