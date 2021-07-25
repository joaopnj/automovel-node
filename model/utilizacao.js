var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var utilizacao = new Schema({
    automovel:       {type: String },
    motorista:       {type: String },
    motivo:          {type: String },
    dataInicio:      {type: Date},
    dataFim:         {type: Date},
    created_date:    {type: Date, default: Date.now}
});

module.exports = mongoose.model('utilizacao', utilizacao);