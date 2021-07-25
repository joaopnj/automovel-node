const MotoristaService = require('../services/MotoristaService');

MotoristaController = {
    search : (req, res) => {
       MotoristaService.search(req, res);
    },

    upsert: (req, res) => {
        MotoristaService.upsert(req, res);
    },

    save: (req, res) => {
        MotoristaService.save(req, res);
    },

    delete: (req, res) => {
        MotoristaService.delete(req, res);
    },
};

module.exports = MotoristaController;