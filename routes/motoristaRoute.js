var express           = require('express');
var router            = express.Router();
var MotoristaController = require('../controller/MotoristaController');

router.get('/', (req, res, next) => {
    MotoristaController.search(req, res);
});

router.delete('/:id', (req, res) =>
    MotoristaController.delete(req, res)
);

router.post('/upsert', (req, res) =>
    MotoristaController.upsert(req.body, res)
);

router.post('/', (req, res) =>
    MotoristaController.save(req.body, res)
);

module.exports = router;
