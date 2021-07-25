var Automovel = require('./../model/automovel');

AutomovelService = {
    search: (req, res) => {
        if (req.query.placa && req.query.cor ) {
            Automovel.findOne({
                'placa': req.query.placa,
                'cor': req.query.cor
            }, (err, automovel) => {
                return automovel ? res.status(200).send(automovel) : res.status(400).send('Automovel não encontrado!');
            });
        } else {
            if (req.query.placa) return res.status(400).send("Coloque a cor para a pesquisa");
            if (req.query.cor) return res.status(400).send("Coloque a cor para a pesquisa");
            Automovel.find( (err, automovel) => {
                return automovel ? res.status(200).send(automovel) : res.status(400).send('Automoveis não encontrados!');
            });
        }
    },

    upsert: async (body, res) => {
        if (!body.id) return res.status(400).send("Coloque o id para a pesquisa");
        var query = {
            '_id': body.id
        };
        Automovel.findOneAndUpdate(query, body, {
            upsert: true,
            new: false
        }, function (err, doc) {
            if (err) {
                return res.send(500, {
                    error: err
                });
            }
            return res.status(200).send(doc);
        });
    },

    save: async (body, res) => {
        automovel = new Automovel();
        automovel.placa = body.placa;
        automovel.cor = body.cor;
        automovel.marca = body.marca;
        automovel.save(function (err, data) {
            if (err) {
                console.error(err);
                res.sendStatus(400);
            }
            res.status(200).send(data);
        });
    },

    delete: async (req, res) => {
        Automovel.findByIdAndDelete(req.params.id, function (err, doc) {
            if (err) {
                return res.send(400, {
                    error: err
                });
            }
            return res.status(200).send(doc);
        });
    },
};


module.exports = AutomovelService;