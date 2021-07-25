var Automovel = require('./../model/automovel');

AutomovelService = {
    search: (req, res) => {
        Automovel.findOne({'placa' : req.query.placa, 'cor' : req.query.cor}, (err, Automovel) => {
            return Automovel ? res.status(200).send(Automovel) : res.status(400).send('Automovel not found!');
        });
    },

    upsert: async (body, res) => {
        var query = {'placa': body.placa, 'cor' :body.cor };
        body.created_date = Date.now();
        Automovel.findOneAndUpdate(query, body, {upsert: true, new: true}, function(err, doc){
            if(err) {
                return res.send(500, { error: err});
            }
            return res.status(200).send(doc);
        });
    },

    save: async (body, res) => {
        automovel = new Automovel();
        automovel = body;
        automovel.save(function(err) {
            if(err) { 
                console.error(err);
                res.sendStatus(400);
            }
            res.sendStatus(200);
        });
    },

    delete: async (req, res) => {
        Automovel.findByIdAndDelete(req.params.id, function(err, doc){
            if(err) {
                return res.send(500, { error: err});
            }
            return res.status(200).send(doc);
        });
    },
};


module.exports = AutomovelService;