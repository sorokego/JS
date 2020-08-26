function countBasketPrice (basketPriceArray) {
    var i;
    var basketPrice = 0;

    for (i=0; i< basketPriceArray.length; i++) {
        if (isNaN(basketPriceArray[i])) {
            alert('One of elements is not a number!');
            return -1;
        }
        basketPrice = basketPrice + basketPriceArray[i]; 
    }
    return basketPrice;
}

var goodsArray = [5, 10, 15, 20];
var basketPrice = countBasketPrice(goodsArray);

alert(basketPrice);

