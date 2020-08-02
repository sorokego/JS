function power(val, pow) {
    if (pow !== 1) { 
        return power(val, pow - 1) * val;
    } else {
        return val;
    }
}

alert(power(5,3));