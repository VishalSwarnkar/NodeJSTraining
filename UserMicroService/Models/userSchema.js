const mongoose = require('mongoose');

const userschema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users', userschema);