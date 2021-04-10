const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

const port = process.env.PORT || 5000;
const dbURI = 'mongodb+srv://admin:27112007aS@servercluster.jgdqr.mongodb.net/clicker_game_v2_db?retryWrites=true&w=majority';

const app = express();

app.use(express.static('public'));

mongoose.connect(dbURI, result => app.listen(port));

app.get('/', (req, res) => {
    res.send(fs.readFileSync('index.html', 'utf8'));
});