const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Profile = require('./models/profile.js');

const port = process.env.PORT || 5000;
const dbURI = 'mongodb+srv://admin:27112007aS@servercluster.jgdqr.mongodb.net/clicker_game_v2_db?retryWrites=true&w=majority';

const app = express();

const mainDir = `${__dirname}\\public`;

app.use(express.static(mainDir));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => app.listen(port));

mongoose.set('useFindAndModify', false);

app.get('/', (req, res) => {
    res.render('pages/index', {
        title: "Clicker Game 2.0",
        stylesheet: "./style.css"
    });
});

app.post('/add-user', (req, res) => {
    let shop_object = {
        Workers: JSON.parse(req.body.Workers),
        ClickUpgrades: JSON.parse(req.body.ClickUpgrades),
        SouvenirShops: JSON.parse(req.body.SouvenirShops),
        BookStores: JSON.parse(req.body.BookStores),
        ClothesShops: JSON.parse(req.body.ClothesShops),
        PhoneStores: JSON.parse(req.body.PhoneStores),
        ShoeShops: JSON.parse(req.body.ShoeShops)
    };

    var user;

    if (req.body.returnAmountLoan && req.body.returnAmountDeposit) {
        user = new Profile({
            Shop: shop_object,
            money: parseFloat(req.body.money),
            username: req.body.name,
            returnAmountLoan: parseFloat(req.body.returnAmountLoan),
            returnAmountDeposit: parseFloat(req.body.returnAmountDeposit)
        });
    } else if (req.body.returnAmountLoan) {
        user = new Profile({
            Shop: shop_object,
            money: parseFloat(req.body.money),
            username: req.body.name,
            returnAmountLoan: parseFloat(req.body.returnAmountLoan)
        });
    } else if (req.body.returnAmountDeposit) {
        user = new Profile({
            Shop: shop_object,
            money: parseFloat(req.body.money),
            username: req.body.name,
            returnAmountDeposit: parseFloat(req.body.returnAmountDeposit)
        });
    } else {
        user = new Profile({
            Shop: shop_object,
            money: parseFloat(req.body.money),
            username: req.body.name
        });
    }

    Profile.find({
        username: req.body.name
    }).then(profiles => {
        if (profiles.length > 0 && req.body.name === req.body.username) {
            Profile.findOneAndUpdate({
                username: req.body.name
            }, {
                Shop: user.Shop,
                money: user.money,
                username: user.username
            }, (err, result) => {
                (err) ? res.send(err): null;
                res.redirect(`/${result.id}`);
            });
        } else if (profiles.length > 0) {
            res.render('pages/username-taken', {
                title: "Clicker Game 2.0 | Username Taken",
                stylesheet: "./style.css"
            });
        } else {
            user.save().then(result => res.redirect(`/${result.id}`)).catch(err => console.log(err));
        }
    }).catch(err => {
        throw err
    });

    // Profile.find().then(profiles => {
    //     profiles.forEach(profile => {
    //         if (profile.username === user.name) {
    //             res.send('This username is already taken. Try again.');
    //             return;
    //         }
    //     });

    //     user.save().then(result => res.redirect(`/${result.id}`)).catch(err => console.log(err));
    // });
});

app.get('/login', (req, res) => {
    res.render('pages/login', {
        title: "Clicker Game 2.0 | Login",
        stylesheet: "./style.css"
    });
});

app.post('/login-user', (req, res) => {
    Profile.findOne({
        username: req.body.username
    }).then(result => {
        res.redirect(`/${result.id}`);
    }).catch(err => console.log(err));
});

app.get('/:id', async (req, res) => {
    let user = await Profile.findById(req.params.id);

    res.render('pages/index2', {
        title: `Clicker Game 2.0 | ${user.username}`,
        stylesheet: "style.css",
        user: JSON.stringify({
            username: user.username,
            money: user.money,
            Shop: user.Shop,
            returnAmountLoan: user.returnAmountLoan || undefined,
            returnAmountDeposit: user.returnAmountLoan || undefined
        })
    });
});
