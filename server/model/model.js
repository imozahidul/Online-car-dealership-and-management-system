const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    image:{
        type: String,
        require: true
    },
    brand:{
        type: String,
        require: true
    },
    model:{
        type: String,
        require: true,
    },
    color:{
        type: String,
        require: true
    },
    price:{
        type: String,
        require: true
    },
    type: String,
    status: String
})

const Userdb = mongoose.model('userdb',schema);
module.exports = Userdb;