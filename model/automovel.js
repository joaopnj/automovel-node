var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var automovel = new Schema({
    placa:           {type: String, unique: true},
    cor:             {type: String },
    marca:           {type: String },
    created_date:    {type: Date, default: Date.now}
});

module.exports = mongoose.model('automovel', automovel);