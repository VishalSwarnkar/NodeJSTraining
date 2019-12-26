const mongoose = require('mongoose');
const User = require('./Models/userSchema');

const IP_ADDRESS = process.env.IP_ADDRESS || "127.0.0.1"
const connection = `mongodb://${IP_ADDRESS}:27017/${process.env.MONGO_INITDB_DATABASE}`;

const connectDB = () =>{
    return mongoose.connect(connection);
}





module.exports = connectDB;