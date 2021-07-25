var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var motorista = new Schema({
    nome:       {type: String },
    created_date:    {type: Date, default: Date.now}
});

module.exports = mongoose.model('motorista', motorista);