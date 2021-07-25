var Motorista = require('./../model/motorista');

MotoristaService = {
    search: (req, res) => {
        if (req.query.nome) {
            Motorista.findOne({
                'nome': req.query.nome
            }, (err, Motorista) => {
                return Motorista ? res.status(200).send(Motorista) : res.status(400).send('Motorista não encontrado!');
            });
        } else {
            Motorista.find((err, Motorista) => {
                return Motorista ? res.status(200).send(Motorista) : res.status(400).send('Motoristas não encontrados!');
            });
        }
    },

    upsert: async (body, res) => {
        if (!body.id) return res.status(400).send("Coloque o id para a pesquisa");
        var query = {
            '_id': body.id
        };
        Motorista.findOneAndUpdate(query, body, {
            upsert: true,
            new: false
        }, function (err, doc) {
            if (err) return res.send(500, {
                error: err
            });
            return !doc ? res.status(400).send('Motorista não encontrado!') : res.status(200).send(doc);
        });
    },

    save: async (body, res) => {
        motorista = new Motorista();
        motorista.nome = body.nome;
        motorista.save(function (err, data) {
            if (err) {
                console.error(err);
                res.sendStatus(400);
            }
            res.status(200).send(data);
        });
    },

    delete: async (req, res) => {
        Motorista.findByIdAndDelete(req.params.id, function (err, doc) {
            if (err) {
                return res.send(400, {
                    error: err
                });
            }
            return res.status(200).send(doc);
        });
    },
};


module.exports = MotoristaService;