var express           = require('express');
var router            = express.Router();
var UtilizacaoController = require('../controller/UtilizacaoController');

router.get('/', (req, res, next) => {
    UtilizacaoController.search(req, res);
});

router.post('/finalizar', (req, res) =>
    UtilizacaoController.upsert(req.body, res)
);

router.post('/iniciar', (req, res) =>
    UtilizacaoController.save(req.body, res)
);

module.exports = router;
