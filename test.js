const fs = require('fs');
fs.readFile('./config.json', (error, data) => {
    console.log(JSON.parse(data).database.dbURI);
});