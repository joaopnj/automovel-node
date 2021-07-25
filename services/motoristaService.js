var Motorista = require('./../model/motorista');

MotoristaService = {
    search: (req, res) => {
        Motorista.findOne({'nome' : req.query.nome}, (err, Motorista) => {
            return Motorista ? res.status(200).send(Motorista) : res.status(400).send('Motorista not found!');
        });
    },

    upsert: async (body, res) => {
        var query = {'nome': body.placa};
        body.created_date = Date.now();
        Motorista.findOneAndUpdate(query, body, {upsert: true, new: true}, function(err, doc){
            if(err) {
                return res.send(500, { error: err});
            }
            return res.status(200).send(doc);
        });
    },

    save: async (body, res) => {
        motorista = new Motorista();
        motorista = body;
        motorista.save(function(err) {
            if(err) { 
                console.error(err);
                res.sendStatus(400);
            }
            res.sendStatus(200);
        });
    },

    delete: async (req, res) => {
        Motorista.findByIdAndDelete(req.params.id, function(err, doc){
            if(err) {
                return res.send(500, { error: err});
            }
            return res.status(200).send(doc);
        });
    },
};


module.exports = MotoristaService;