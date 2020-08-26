var myBasket = {
    items: [],

    clearBasket: function() {
        this.items = [];
    },

    increaseAmountInBasket: function(itemPosition) {
        this.items[itemPosition].amount++;
    },

    reduceAmountInBasket: function(itemPosition) {
        this.items[itemPosition].amount--;
    },

    removeFromBasket: function(itemPosition) {
        var i;
        for (i=itemPosition; i < this.items.length; i++) {
            this.items[i] = this.items[i+1];
        }
        this.items.pop();
    },

    countBasketPrice: function() {
        var i;
        var basketPrice = 0;

        for (i=0; i< this.items.length; i++) {
            if (isNaN(this.items[i].price)) {
                alert('One of elements is not a number!');
                return -1;
            }
            basketPrice = basketPrice + this.items[i].price; 
        }
        return basketPrice;
    },

}

var product = {
    name: 'молоко',
    price: 18,
    imageAddress: 'img/milk.jpg',
    package: '1 литр',
    weight: 1.1,
    amount: 50,

    addToBasket: function(basket, amountToBasket) {
        basket.items.push({product: this, amount: amountToBasket});
    },

    addAmount: function(number) {
        this.amount = this.amount + number;
    },

    reduceAmount: function(number) {
        this.amount = this.amount - number;
    },
}

var product2 = {
    name: 'хлеб',
    price: 30,
    imageAddress: 'img/bread.jpg',
    package: '1 буханка',
    weight: 600,
    amount: 100,

    addToBasket: function(basket, amountToBasket) {
        basket.items.push({product: this, amount: amountToBasket});
    },

    addToStock: function(number) {
        this.amount = this.amount + number;
    },

    removeFromStock: function(number) {
        this.amount = this.amount - number;
    },
}

var basketContainer = document.getElementById('container');

product.addToBasket(myBasket, 5);
product2.addToBasket(myBasket, 1);

if (myBasket.items.length == 0) {
    document.getElementById('container').innerHTML = 'Корзина пуста';
} else {
    var sum = 0;
    var count = 0;
    for (i = 0; i<myBasket.items.length; i++) {
        sum = sum + myBasket.items[i].amount * myBasket.items[i].product.price;
        count = count + myBasket.items[i].amount;
    }
    document.getElementById('container').innerHTML = 'В корзине ' + count + ' товаров на сумму ' + sum + ' рублей.'
}

var productsArray = [product, product2];

for (i=0; i<productsArray.length; i++) {
    
}

document.getElementById('catalog').appendChild()