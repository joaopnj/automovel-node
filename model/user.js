var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var users = new Schema({
    username:     {type: String },
    password:     {type: String },
    token:        {type: String },
    created_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('users', users);