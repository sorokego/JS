var a = null;
var b = 0;

if (a > b) {
    alert('null > 0');
} else if (a < b) {
    alert('null < 0');
} else if (a == b) {
    alert('null = 0');
} else {
    alert('Что-то другое');
}

alert('null нельзя перевести в другой тип данных, поэтому сравнение не работает');