const AutomovelService = require('../services/AutomovelService');

AutomovelController = {
    search : (req, res) => {
       AutomovelService.search(req, res);
    },

    upsert: (req, res) => {
        AutomovelService.upsert(req, res);
    },

    save: (req, res) => {
        AutomovelService.save(req, res);
    },

    delete: (req, res) => {
        AutomovelService.delete(req, res);
    },
};

module.exports = AutomovelController;