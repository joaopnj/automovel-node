const UtilizacaoService = require('../services/UtilizacaoService');

UtilizacaoController = {
    search : (req, res) => {
       UtilizacaoService.search(req, res);
    },

    upsert: (req, res) => {
        UtilizacaoService.upsert(req, res);
    },

    save: (req, res) => {
        UtilizacaoService.save(req, res);
    },

    delete: (req, res) => {
        UtilizacaoService.delete(req, res);
    }
};

module.exports = UtilizacaoController;