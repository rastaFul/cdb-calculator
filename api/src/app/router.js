const express = require('express');
const router = express.Router();

const { mainController, cdiController } = require('../controllers');

router.get('/api/ping', mainController.ping);

router.post('/api/v1/cdi/fees', cdiController.loadFees);


module.exports = router;
