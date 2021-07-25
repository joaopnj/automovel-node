var Utilizacao = require('../model/utilizacao');

UtilizacaoService = {
    search: (req, res) => {
        Utilizacao.findOne({'placa' : req.query.placa}, (err, Utilizacao) => {
            return Utilizacao ? res.status(200).send(Utilizacao) : res.status(400).send('Utilizacao not found!');
        });
    },

    upsert: async (body, res) => {
        var query = {'placa': body.placa};
        
        Utilizacao.findOneAndUpdate(query, {"dataFinal" : Date.now()} , {upsert: true, new: true}, function(err, doc){
            if(err) {
                return res.send(500, { error: err});
            }
            return res.status(200).send(doc);
        });
    },

    save: async (body, res) => {
        Utilizacao.findOne({'placa' : req.body.placa}, (err, utilizacao) => {
            if(!utilizacao) { 
                utilizacao = new Utilizacao();
                utilizacao = body;
                utilizacao.save(function(err) {
                    if(err) { 
                        console.error(err);
                        res.sendStatus(400);
                    }
                    return res.sendStatus(200);
                });
            } else if(utilizacao.dataFinal){
                utilizacao = new Utilizacao();
                utilizacao = body;
                utilizacao.save(function(err) {
                    if(err) { 
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