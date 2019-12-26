var mongoose = require('mongoose');
var Schema = mongoose.Schema;


  const restaurantSchema = new Schema({
    name:{
      type: String,
      required: true,
      /* unique: true */
    },
    description:{
      type: String,
      required: true
    },
    location: {
      type: Map,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    ratings: {
      type: Number,
      default: ''
    },
    Budget: {
      type: Number
    },
    Cuisine: {
      type: String
    }
  },{
    timestamps: true
  });
  

var Restaurant = mongoose.model('Restaurant', restaurantSchema, 'Restaurant');

module.exports = Restaurant;