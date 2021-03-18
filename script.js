// Main variables
var money = 500000;
var moneyPerClick = 1;
var moneyPerSecond = 0;
var moneyPercentage = 1.00;
var rebirthCost = 500000;
// Elements
var moneyElement = document.querySelector('#money');
var moneyPerSecondElement = document.querySelector('#moneyPerSecond');
var moneyPerClickElement = document.querySelector('#moneyPerClick');
var moneyPercentageElement = document.querySelector('#moneyPercentage');
var rebirthDescription = document.querySelector('#rebirthDescription');
// Other
var checkedCosts = false;
var user = null;
var loan = false;
var deposit = false;

// Shop object
var Shop = {
    Workers: {
        count: 0,
        cost: 100,
        startingCost: 100,
        moneyAdd: 75,
        income: 5,
        element: document.querySelector('#workersDescription'),
        button: null
    },

    ClickUpgrades: {
        count: 1,
        cost: 150,
        startingCost: 150,
        moneyAdd: 150,
        element: document.querySelector('#clickUpgradesDescription'),
        button: null
    }, 

    SouvenirShops: {
        count: 0,
        cost: 4000,
        startingCost: 4000,
        moneyAdd: 2000,
        income: 25,
        element: document.querySelector('#souvenirShopsDescritption'),
        button: document.querySelector('#souvenirShopsButton')
    }, 

    BookStores: {
        count: 0,
        cost: 9000,
        startingCost: 9000,
        moneyAdd: 4000,
        income: 50,
        element: document.querySelector('#bookStoresDescription'),
        button: document.querySelector('#bookStoresButton')
    }, 

    ClothesShops: {
        count: 0,
        cost: 14500,
        startingCost: 14500,
        moneyAdd: 8250,
        income: 150,
        element: document.querySelector('#clothesShopsDescription'),
        button: document.querySelector('#clothesShopsButton')
    }, 

    GsmStores: {
        count: 0,
        cost: 20000,
        startingCost: 20000,
        moneyAdd: 12500,
        income: 250,
        element: document.querySelector('#gsmStoresDescription'),
        button: document.querySelector('#gsmStoresButton')
    },

    ShoeShops: {
        count: 0,
        cost: 25000,
        startingCost: 25000,
        moneyAdd: 15000,
        income: 325,
        element: document.querySelector('#shoeShopsDescription'),
        button: document.querySelector('#shoeShopsButton')
    }
};

// Initializing the buy function
function buy(what) {
    if (money >= Shop[what].cost) {
        money -= Shop[what].cost;
        Shop[what].count++;
        Shop[what].cost += Shop[what].startingCost + Shop[what].count * Shop[what].moneyAdd;
    } else {
        alert('You don\'t have enough money.')
    }
}


// Initializing main function
function update() {
    moneyElement.innerHTML = `Your money: ${money} $`;

    moneyPerSecond = calculateMoneyPerSecond() * moneyPercentage;
    moneyPerSecondElement.innerHTML = `Money per second: ${moneyPerSecond} $`;

    moneyPercentageElement.innerHTML = `Money percentage: ${moneyPercentage * 100} %`;

    moneyPerClick = Shop.ClickUpgrades.count * moneyPercentage;
    moneyPerClickElement.innerHTML = `Money per click: ${moneyPerClick} $`;
    
    Shop.Workers.element.innerHTML = `Workers give you 5 $ per second. They cost ${Shop.Workers.cost} $. You currently have ${Shop.Workers.count} workers.`;

    Shop.ClickUpgrades.element.innerHTML = `Click upgrades give you more money per click. They cost ${Shop.ClickUpgrades.cost} $. You currently have ${Shop.ClickUpgrades.count} click upgrade.`;

    Shop.SouvenirShops.element.innerHTML = `Souvenir shops give you 25 $ per second. They cost ${Shop.SouvenirShops.cost} $. You currently have ${Shop.SouvenirShops.count} souvenir shops. This item must be unlocked.`;

    Shop.BookStores.element.innerHTML = `Book stores give you 50 $ per second. They cost ${Shop.BookStores.cost} $. You currently have ${Shop.BookStores.count} book stores. This item must be unlocked.`;

    Shop.ClothesShops.element.innerHTML = `Clothes shops give you 150 $ per second. They cost ${Shop.ClothesShops.cost} $. You currently have ${Shop.ClothesShops.count} clothes shops. This item must be unlocked.`;
    
    Shop.GsmStores.element.innerHTML = `GSM stores give you 250 $ per second. They cost ${Shop.GsmStores.cost} $. You currently have ${Shop.GsmStores.count} GSM stores. This item must be unlocked.`;

    Shop.ShoeShops.element.innerHTML = `Shoe shops give you 325 $ per second. They cost ${Shop.ShoeShops.cost} $. You currently have ${Shop.ShoeShops.count} shoes shops. This item must be unlocked.`;

    rebirthDescription.innerHTML = `Rebirths take all your money upgrades and shops but they increase your money gain by 25 % than before. They cost ${rebirthCost} $.`;

    for (let i = 0; i < Object.values(Shop).length - 1; i++) {
        if (i != 0 && i != 1) {
            if (Object.values(Shop)[i].count >= 10) {
                Object.values(Shop)[i+1].button.disabled = false;
            } else {
                Object.values(Shop)[i+1].button.disabled = true;
            }
        } else if (i == 1) {
            if (Object.values(Shop)[i-1].count >= 10) {
                Object.values(Shop)[i+1].button.disabled = false;
            } else {
                Object.values(Shop)[i+1].button.disabled = true;
            }
        }
    }

    if (!checkedCosts) {
        for (let i = 0; i < Object.values(Shop).length; i++) {
            Object.values(Shop)[i].cost = Object.values(Shop)[i].startingCost + Object.values(Shop)[i].count * Object.values(Shop)[i].moneyAdd;
        }
        
        checkedCosts = true;
    }
}


function moneyAdd() {
    money += moneyPerClick;
}

function rebirth() {
    if (money >= rebirthCost) {
        money -= rebirthCost;
        rebirthCost += 500000;
        moneyPercentage += 0.25;
        for (let i = 0; i < Object.values(Shop).length; i++) {
            Object.values(Shop)[i].count = 0;
        }
        Shop.ClickUpgrades.count = 1;
        checkedCosts = false;
    } else {
        alert('You don\'t have enough money.');
    }
}

function takeLoan() {
    var quantities = document.querySelectorAll('[name="quantityLoan"]');
    var times = document.querySelectorAll('[name="timeLoan"]');
    var quantity = 0;
    var time = 0;

    for (let i = 0; i < quantities.length; i++) {
        (quantities[i].checked == true) ? quantity = parseInt(quantities[i].value) : null;
    }

    for (let i = 0; i < times.length; i++) {
        (times[i].checked == true) ? time = parseInt(times[i].value) : null;
    }

    if (!(quantity && time)) {
        alert('Please select a quantity and a time.');
        return;
    } else {
        if (deposit == false && loan == false) {
            loan = true;
            let returnAmount = quantity * 1.1;
            money += quantity;
            setTimeout(() => {
                money -= returnAmount;
                loan = false;
            }, time * 1000);
        } else {
            alert('You can\'t have multiple loans and deposits at the same time.');
        }
    }
}

function makeDeposit() {
    var quantities = document.querySelectorAll('[name="quantityDeposit"]');
    var quantity = 0;
    var time = 300;

    for (let i = 0; i < quantities.length; i++) {
        (quantities[i].checked == true) ? quantity = parseInt(quantities[i].value) : null;
    }

    if (!quantity) {
        alert('Please select a quantity.');
    } else {
        if (deposit == false && loan == false) {
            deposit = true;
            let returnAmount = quantity * 1.05;
            money -= quantity;
            setTimeout(() => {
                money += returnAmount;
                deposit = false;
            }, time * 1000);
        } else {
            alert('You can\'t have multiple loans and deposits at the same time');
        }
    }
}

function getNavigationTags() {
    var arr = Object.keys(Shop);
    var splitted = [];
    var returnArr = [];

    arr.forEach(element => {
        splitted.push(element.split('S'));
    });
    
    for (let i = 0; i < splitted.length; i++) {
        let el = splitted[i];
        if (el[0] === '') {
            el[1] = 'S' + el[1];
            el.shift();
        }
        if (el.length > 1) {
            let str = el[0].toLowerCase();
            for (let j = 1; j < el.length; j++) {
                if (j == el.length - 1) {
                el[j] = 'S' + el[j];
                str += el[j].substring(0, el[j].length - 1);
                } else {
                    el[j] = 'S' + el[j];
                    str += el[j];
                }
            }
            str += 'Div';
            returnArr.push(str);
        } else {
            returnArr.push(el[0].toLowerCase().substring(0, el[0].length - 1) + 'Div');
        }
    }
    
    return returnArr;
}

function makeNav() {
    var divs = getNavigationTags();
    for (let i = 0; i < divs.length; i++) {
        divs[i] = '#' + divs[i];
    }

    for (let i = 0; i < divs.length; i++) {
        let a = document.createElement('a');
        a.innerHTML = Object.keys(Shop)[i];
        a.setAttribute('href', divs[i]);
        document.querySelector('#navigation').appendChild(a);
    }

    let a = document.createElement('a');
    a.setAttribute('id', 'special');
    document.querySelector('#navigation').appendChild(a);
}

function gamble() {
    var bets = document.querySelectorAll('[name="bet"]');
    var guesses = document.querySelectorAll('[name="guess"]');
    var bet = 0;
    var guess = 0;

    for (let i = 0; i < bets.length; i++) {
        (bets[i].checked == true) ? bet = parseInt(bets[i].value) : null;
    }

    for (let i = 0; i < guesses.length; i++) {
        (guesses[i].checked == true) ? guess = parseInt(guesses[i].value) : null;
    }

    if (!(bet && guess)) {
        alert('Please select your bet and guess.');
    } else {
        if (Math.floor((Math.random() * 7) + 1) === guess) {
            money += bet;
            alert('You guessed right! You win!');
        } else {
            money -= bet;
            alert('Your guess wasn\'t right. Try again.');
        }
    }
}

function calculateMoneyPerSecond() {
    let val = 0;
    for (let i = 0; i < Object.values(Shop).length; i++) {
        if (i === 1) continue;
        val += Object.values(Shop)[i].count * Object.values(Shop)[i].income;
    }
    return val;
}

// Initializing intervals and running functions
makeNav();
var updateInterval = setInterval(update, 10);
var moneyPerSecondInterval = setInterval(() => {
    money += moneyPerSecond;
}, 1000);