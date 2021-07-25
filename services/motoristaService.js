var Motorista = require('./../model/motorista');

MotoristaService = {
    search: (req, res) => {
        if(req.query.nome){
            Motorista.findOne({'nome' : req.query.nome}, (err, Motorista) => {
                return Motorista ? res.status(200).send(Motorista) : res.status(400).send('Motorista não encontrado!');
            });
        } else {
            Motorista.find( (err, Motorista) => {
                return Motorista ? res.status(200).send(Motorista) : res.status(400).send('Motoristas não encontrados!');
            });
        }
    },

    upsert: async (body, res) => {
        var query = {'nome': body.nome};
        Motorista.findOneAndUpdate(query, body, {upsert: true}, function(err, doc){
            if(err) {
                return res.send(500, { error: err});
            }
            return res.status(200).send(doc);
        });
    },

    save: async (body, res) => {
        motorista = new Motorista();
        motorista.nome = body.nome;
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
                return res.send(400, { error: err});
            }
            return res.status(200).send(doc);
        });
    },
};


module.exports = MotoristaService;