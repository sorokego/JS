var i;
var outputString = "";
var outputArray = [];
var numberOfDevisors;

for (i=2; i<101; i++) {
    j=i-1;
    numberOfDevisors = 1;
    while (j != 0 && numberOfDevisors != 3) {
        if (i % j == 0) {
            numberOfDevisors++;
        }
        j--;
    }
    if (numberOfDevisors == 2) {
        outputArray.push(i);
    }
}

outputString = outputArray[0];
for (i=1; i< outputArray.length; i++) {
    outputString = outputString + ", " + outputArray[i];
}

alert(outputString);
