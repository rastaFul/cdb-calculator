const express = require('express');
const router = express.Router();

const { mainController, cdiController, cdbController } = require('../controllers');

router.get('/api/v1/ping', mainController.ping);

router.get('/api/v1/cdb/calculate', cdbController.getCalculate);

router.post('/api/v1/cdi/load/tax', cdiController.loadTax);


module.exports = router;
