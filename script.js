// Main variables
var money = 500000;
var moneyPerClick = 1;
var moneyPerSecond = 0;
var moneyPercentage = 1.00;
var rebirthCost = 500000;
var returnPerSecond = 0;
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

// Shop object
var Shop = {
    Workers: {
        count: 0,
        cost: 100,
        startingCost: 100,
        moneyAdd: 75,
        income: 5,
        element: document.querySelector('#workersDescription')
    },

    ClickUpgrades: {
        count: 1,
        cost: 150,
        startingCost: 150,
        moneyAdd: 150,
        element: document.querySelector('#clickUpgradesDescription')
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

    moneyPerSecond = (Shop.Workers.count * Shop.Workers.income + Shop.SouvenirShops.count * Shop.SouvenirShops.income + Shop.BookStores.count * Shop.BookStores.income + Shop.ClothesShops.count * Shop.ClothesShops.income + Shop.GsmStores.count * Shop.GsmStores.income) * moneyPercentage - returnPerSecond;
    moneyPerSecondElement.innerHTML = `Money per second: ${moneyPerSecond} $`;

    moneyPercentageElement.innerHTML = `Money percentage: ${moneyPercentage * 100} %`;

    moneyPerClick = Shop.ClickUpgrades.count * moneyPercentage;
    moneyPerClickElement.innerHTML = `Money per click: ${moneyPerClick}`;
    
    Shop.Workers.element.innerHTML = `Workers give you 5 $ per second. They cost ${Shop.Workers.cost} $. You currently have ${Shop.Workers.count} workers.`;

    Shop.ClickUpgrades.element.innerHTML = `Click upgrades give you more money per click. They cost ${Shop.ClickUpgrades.cost} $. You currently have ${Shop.ClickUpgrades.count} click upgrade.`;

    Shop.SouvenirShops.element.innerHTML = `Souvenir shops give you 25 $ per second. They cost ${Shop.SouvenirShops.cost} $. You currently have ${Shop.SouvenirShops.count} souvenir shops. This item must be unlocked.`;

    Shop.BookStores.element.innerHTML = `Book stores give you 50 $ per second. They cost ${Shop.BookStores.cost} $. You currently have ${Shop.BookStores.count} book stores. This item must be unlocked.`;

    Shop.ClothesShops.element.innerHTML = `Clothes shops give you 150 $ per second. They cost ${Shop.ClothesShops.cost} $. You currently have ${Shop.ClothesShops.count} clothes shops. This item must be unlocked.`;
    
    Shop.GsmStores.element.innerHTML = `GSM stores give you 250 $ per second. They cost ${Shop.GsmStores.cost} $. You currently have ${Shop.GsmStores.count} GSM stores. This item must be unlocked.`;

    if (Shop.Workers.count >= 10) {
        Shop.SouvenirShops.button.disabled = false;
    } else {
        Shop.SouvenirShops.button.disabled = true;
    }
    if (Shop.SouvenirShops.count >= 10) {
        Shop.BookStores.button.disabled = false;
    } else {
        Shop.BookStores.button.disabled = true;
    }
    if (Shop.BookStores.count >= 10) {
        Shop.ClothesShops.button.disabled = false;
    } else {
        Shop.ClothesShops.button.disabled = true;
    }
    if (Shop.ClothesShops.count >= 10) {
        Shop.GsmStores.button.disabled = false;
    } else {
        Shop.GsmStores.button.disabled = true;
    }

    if (!checkedCosts) {
        Shop.Workers.cost = Shop.Workers.startingCost + Shop.Workers.count * Shop.Workers.moneyAdd;
        Shop.SouvenirShops.cost = Shop.SouvenirShops.startingCost + Shop.SouvenirShops.count * Shop.SouvenirShops.moneyAdd;
        Shop.BookStores.cost = Shop.BookStores.startingCost + Shop.BookStores.count * Shop.BookStores.moneyAdd;
        Shop.ClothesShops.cost = Shop.ClothesShops.startingCost + Shop.ClothesShops.count * Shop.ClothesShops.moneyAdd;
        Shop.GsmStores.cost = Shop.GsmStores.startingCost + Shop.GsmStores.count * Shop.GsmStores.moneyAdd;
        
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
        alert('You don\t have enough money.');
    }
}

// Initializing intervals
var updateInterval = setInterval(update, 10);
var moneyPerSecondInterval = setInterval(() => {
    money += moneyPerSecond;
}, 1000);