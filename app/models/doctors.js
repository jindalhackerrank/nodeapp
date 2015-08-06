// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var doctors   = new Schema({
    name: String,
   	age :String,
   	
});

module.exports = mongoose.model('Doctor', doctors);