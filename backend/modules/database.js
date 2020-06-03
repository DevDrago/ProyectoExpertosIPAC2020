var mongoose = require('mongoose');

var servidor = 'localhost:27017';
var db = 'somniadb';

class Database{
    constructor(){
        mongoose.connect(`mongodb://${servidor}/${db}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log('Se conectó a MongoDB.');
        }).catch((error)=>{
            console.log(error);
        });
    }
}

module.exports = new Database();