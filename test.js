const mongoose = require('mongoose');
const Profile = require('./models/profile.js');

const dbURI = 'mongodb+srv://admin:27112007aS@servercluster.jgdqr.mongodb.net/clicker_game_v2_db?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {});

//This function returns promise after 2 seconds
var get_name = function(name) {
    return new Promise(resolve => {
        let profile = Profile.find({ username: name }).then(result => result).catch(err => err);
        resolve(profile);
    });
};
      
async function get_name_async(name) {
    const users = await get_name(name);
    return users;
}
      
let users = get_name_async("Jeff");

for (let i = 0; i < users.length; i++) {
    console.log(users[i]);
}

// let user = new Profile({
//     username: "Jeff",
//     money: 100000,
//     Shop: {
//         Workers: {
//             count: 0,
//             cost: 100,
//             startingCost: 100,
//             moneyAdd: 75,
//             income: 5
//         },
//         ClickUpgrades: {
//             count: 0,
//             cost: 100,
//             startingCost: 100,
//             moneyAdd: 75,
//             income: 5
//         },
//         SouvenirShops: {
//             count: 0,
//             cost: 100,
//             startingCost: 100,
//             moneyAdd: 75,
//             income: 5
//         },
//         BookStores: {
//             count: 0,
//             cost: 100,
//             startingCost: 100,
//             moneyAdd: 75,
//             income: 5
//         },
//         ClothesShops: {
//             count: 0,
//             cost: 100,
//             startingCost: 100,
//             moneyAdd: 75,
//             income: 5
//         },
//         PhoneStores: {
//             count: 0,
//             cost: 100,
//             startingCost: 100,
//             moneyAdd: 75,
//             income: 5
//         },
//         ShoeShops: {
//             count: 0,
//             cost: 100,
//             startingCost: 100,
//             moneyAdd: 75,
//             income: 5
//         }
//     }
// });

// user.save().then(result => console.log(result)).catch(err => console.log(err));