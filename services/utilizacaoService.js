var Utilizacao = require('../model/utilizacao');

UtilizacaoService = {
    search: (req, res) => {
        if (req.query.automovel && req.query.motorista) {
            Utilizacao.findOne({
                'automovel': req.query.automovel,
                'motorista': req.query.motorista
            }, (err, utilizacao) => {
                return utilizacao ? res.status(200).send(utilizacao) : res.status(400).send('Utilizacao não encontrada!');
            });
        } else {
            if (req.query.automovel) return res.status(400).send("Coloque o automovel para a pesquisa");
            if (req.query.motorista) return res.status(400).send("Coloque o motorista para a pesquisa");
            Utilizacao.find((err, utilizacao) => {
                return utilizacao ? res.status(200).send(utilizacao) : res.status(400).send('Utilizacao não encontrada!');
            });
        }
    },

    upsert: async (body, res) => {
        if (!body.motorista) return res.status(400).send("Coloque o motorista para a pesquisa");
        var query = {
            'motorista': body.motorista
        };
        Utilizacao.findOneAndUpdate(query, {
            "dataFim": Date.now()
        }, {
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
        if (!body.motorista) return res.status(400).send("Coloque o motorista para a inserção");
        Utilizacao.findOne({
            'motorista': body.motorista
        }, (err, utilizacao) => {
            if (!utilizacao) {
                utilizacaoNew = new Utilizacao();
                utilizacaoNew.automovel = body.automovel;
                utilizacaoNew.motorista = body.motorista;
                utilizacaoNew.motivo    = body.motivo;
                utilizacaoNew.save(function (err) {
                    if (err) {
                        console.error(err);
                        res.sendStatus(400);
                    }
                    return res.sendStatus(200);
                });
            } else if (utilizacao.dataFim) {
                utilizacaoNew.automovel = body.automovel;
                utilizacaoNew.motorista = body.motorista;
                utilizacaoNew.motivo    = body.motivo;
                utilizacaoNew.save(function (err) {
                    if (err) {
                        console.error(err);
                        res.sendStatus(400);
                    }
                    return res.sendStatus(200);
                });
            } else {
                return res.status(400).send('Não é possivel utilizar o carro, pois o mesmo está sendo utilizado!');
            }
        });

    }
}


module.exports = UtilizacaoService;