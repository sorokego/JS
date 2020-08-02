var a = prompt('Введите a:');

a = parseInt(a);

if (a == NaN) {
    alert('Not a number');
} else {

    switch(a) {
        case 1:
            alert('1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
            break;
        case 2:
            alert('2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
            break;
        case 3:
            alert('3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
            break;
        case 4:
            alert('4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
            break;
    }

}