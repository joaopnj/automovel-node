var express           = require('express');
var router            = express.Router();
var AutomovelController = require('../controller/AutomovelController');

router.get('/', (req, res, next) => {
    AutomovelController.search(req, res);
});

router.delete('/:id', (req, res) =>
    AutomovelController.delete(req, res)
);

router.post('/upsert', (req, res) =>
    AutomovelController.upsert(req.body, res)
);

router.post('/', (req, res) =>
    AutomovelController.save(req.body, res)
);

module.exports = router;
