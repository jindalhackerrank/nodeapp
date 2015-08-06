// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var locations   = new Schema({
    name: String,
   	pincode :String,
   	coordinates :{
   		lattitude : Number,
   		lonngitude:Number
   	}
});

module.exports = mongoose.model('Location', locations);