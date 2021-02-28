const express = require('express');
const router = express.Router();

const { mainController, cdiController, cdbController } = require('../controllers');

router.get('/api/v1/ping', mainController.ping);

router.get('/api/v1/cdb/evolution', cdbController.getEvolution);

router.post('/api/v1/cdi/fees', cdiController.loadFees);


module.exports = router;
