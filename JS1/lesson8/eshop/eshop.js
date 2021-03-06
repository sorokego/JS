var myBasket = {
    items: [],

    addToBasket: function(productToAdd, amountToBasket) {
        this.items.push({product: productToAdd, amount: amountToBasket});
        this.drawBasketElement(this.items.length - 1)
        this.recalculate();
    },

    drawBasketElement: function(itemPosition) {
        var basketDOM = document.getElementById('basketElementContainer');
        var elementToAdd = document.createElement('div');
        elementToAdd.id = 'basketElement_' + (this.items[itemPosition].product.id);
        elementToAdd.className = 'basketElement';
        elementToAdd.innerHTML = '<img src="' + this.items[itemPosition].product.imageAddress[0] + '" class="basketImage"><h4 class="basketDescription">' + this.items[itemPosition].product.name + '</h4><div class="amountBlock"><a href=# class="basketAmountButton">-</a><span class="amount">' + this.items[itemPosition].amount + '</span><a href=# class="basketAmountButton">+</a><a href=# class="basketDeleteButton">X</a></div>';
        
        this.applyListeners(elementToAdd, itemPosition);

        basketDOM.appendChild(elementToAdd);
    },

    applyListeners: function(elementToAdd, itemPosition) {
        var amountButtons = elementToAdd.getElementsByClassName('basketAmountButton');
        amountButtons[0].onclick = this.reduceAmountInBasket(elementToAdd, itemPosition);
        amountButtons[1].onclick = this.increaseAmountInBasket(elementToAdd, itemPosition);

        var deleteButton = elementToAdd.getElementsByClassName('basketDeleteButton')[0];
        deleteButton.onclick = this.removeFromBasket(elementToAdd, itemPosition);
    },

    clearBasket: function() {
        this.items = [];
        var basketDOM = document.getElementById('basketElementContainer');
        basketDOM.innerHTML = '';
        this.recalculate();
    },

    increaseAmountInBasket: function(basketElement, itemPosition) {
        function increaseAmount (eventObj) {
            myBasket.items[itemPosition].amount++;
            basketElement.querySelector('.amount').innerHTML = myBasket.items[itemPosition].amount;
            myBasket.recalculate();
        }
        return increaseAmount;
    },

    reduceAmountInBasket: function(basketElement, itemPosition) {
        function reduceAmount (eventObj) {
            if (myBasket.items[itemPosition].amount != 1) {
                myBasket.items[itemPosition].amount--;
                basketElement.querySelector('.amount').innerHTML = myBasket.items[itemPosition].amount;
                myBasket.recalculate();
            }
        }
        return reduceAmount;
    },

    removeFromBasket: function(basketElement, itemPosition) {
        function removeElement (eventObj) {
            document.getElementById('basketElementContainer').removeChild(basketElement);
            for (var i=itemPosition; i < myBasket.items.length; i++) {
                myBasket.items[i] = myBasket.items[i+1];
            }
            myBasket.items.pop();
            myBasket.recalculate();

            for (i=0; i<myBasket.items.length; i++) {
                myBasket.applyListeners(document.getElementById('basketElement_' + myBasket.items[i].product.id), i);
            }
        }
        return removeElement;
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

    recalculate: function() {

        if (this.items.length == 0) {
            document.getElementById('basketPrice').innerHTML = 'Корзина пуста';
        } else {
            var sum = 0;
            var count = 0;
            for (i = 0; i<this.items.length; i++) {
                sum = sum + this.items[i].amount * this.items[i].product.price;
                count = count + this.items[i].amount;
            }
            document.getElementById('basketPrice').innerHTML = 'В корзине ' + count + ' товаров на сумму ' + sum + ' рублей.'
        }
        this.saveToLS();
    
    },

    saveToLS: function() {
        localStorage.setItem('basketStorage', JSON.stringify(this));
    },

    getFromLS: function() {
        if (JSON.parse(localStorage.getItem('basketStorage')) != null) {
            this.items = JSON.parse(localStorage.getItem('basketStorage')).items;
            for (var i = 0; i<this.items.length; i++) {
                this.drawBasketElement(i);
            }
        }
        this.recalculate();
    },
}

var product = {
    id: 0,
    name: 'молоко',
    price: 18,
    imageAddress: ['img/milk1.jpg', 'img/milk2.jpg', 'img/milk3.jpg'],
    package: '1 литр',
    weight: 1.1,
    amount: 50,

    addToStock: function(number) {
        this.amount = this.amount + number;
    },

    removeFromStock: function(number) {
        this.amount = this.amount - number;
    },
}

var product2 = {
    id: 1,
    name: 'хлеб',
    price: 30,
    imageAddress: ['img/bread1.jpg', 'img/bread2.jpg'],
    package: '1 буханка',
    weight: 600,
    amount: 100,

    addToStock: function(number) {
        this.amount = this.amount + number;
    },

    removeFromStock: function(number) {
        this.amount = this.amount - number;
    },
}

function addToCatalog(product) {
    var parentContainer = document.getElementById('catalog');
    var productElement = document.createElement('div');
    productElement.id = 'catalogElement_' + (product.id);
    productElement.className = 'catalogElement';
    productElement.innerHTML = '<img src="' + product.imageAddress[0] + '"><br><h3>' + product.name + '</h3><br>Цена: ' + product.price + ' руб.<br><a href="#" id="buyButton_' + productsArray.length + '" class="buyButtonCatalog">Купить</a>';
    productElement.querySelector('a').addEventListener('click', addToBasket);

    productElement.querySelector('img').onclick = modalImageWindowShow;

    parentContainer.appendChild(productElement);

    productsArray.push(product);
}

function addToBasket(eventObject) {
    if (myBasket.items.length != 0) {
        var exist = false;
        for (var i = 0; i < myBasket.items.length; i++) {
            if (myBasket.items[i].product.name == productsArray[eventObject.target.id.split('_')[1]].name) {
                myBasket.items[i].amount++;
                document.getElementById('basketElement_' + myBasket.items[i].product.id).querySelector('.amount').innerHTML = myBasket.items[i].amount;
                myBasket.recalculate();
                exist = true;
            }
        }
        if (!exist) {
            myBasket.addToBasket(productsArray[eventObject.target.id.split('_')[1]], 1);
        }
    } else {
        myBasket.addToBasket(productsArray[eventObject.target.id.split('_')[1]], 1);
    }
}

//Modal window

function modalImageWindowShow(eventObj) {
    var modalWindow = document.createElement('div');
    modalWindow.id='modalWindowBlock';
    modalWindow.setAttribute('productid', eventObj.toElement.parentElement.id.split('_')[1])
    modalWindow.setAttribute('currentimage', 0)
    modalWindow.innerHTML = '<div class="modalWindowContainer"><a href=# class="modalWindowImageChange"><</a><img src="' + eventObj.target.outerHTML.split('"')[1] + '" class="modalWindowImage"><a href=# class="modalWindowImageChange">></a><a href=# class="modalWindowImageClose">X</a></div>'

    var closeButton = modalWindow.getElementsByClassName('modalWindowImageClose');
    closeButton[0].onclick = modalImageWindowHide;

    var controlButtons = modalWindow.getElementsByClassName('modalWindowImageChange');
    controlButtons[0].onclick = modalImageChange;
    controlButtons[1].onclick = modalImageChange;

    document.children[0].children[1].appendChild(modalWindow);
}

function modalImageWindowHide(eventObj) {
    var modalWindow = document.getElementById('modalWindowBlock');
    document.children[0].children[1].removeChild(modalWindow);
}

function modalImageChange(eventObj) {
    var modalWindow = document.getElementById('modalWindowBlock');
    if (eventObj.target.innerText == "<") {
        if (parseInt(modalWindow.getAttribute('currentimage')) != 0) {
            modalWindow.setAttribute('currentimage', parseInt(modalWindow.getAttribute('currentimage')) - 1);
        } else {
            modalWindow.setAttribute('currentimage', productsArray[modalWindow.getAttribute('productid')].imageAddress.length - 1);
        }
    } else {
        if (parseInt(modalWindow.getAttribute('currentimage')) != productsArray[modalWindow.getAttribute('productid')].imageAddress.length - 1) {
            modalWindow.setAttribute('currentimage', parseInt(modalWindow.getAttribute('currentimage')) + 1);
        } else {
            modalWindow.setAttribute('currentimage', 0);
        }
    }
    modalWindow.querySelector('img').src = productsArray[modalWindow.getAttribute('productid')].imageAddress[parseInt(modalWindow.getAttribute('currentimage'))];
}

//Main code

function loadFunction() {

    addToCatalog(product);
    addToCatalog(product2);

    myBasket.getFromLS();

    myBasket.recalculate();
}

var productsArray = [];
window.onload = loadFunction;