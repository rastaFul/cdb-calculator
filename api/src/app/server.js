const express = require('express');
const router = require('./router');
const swaggerUi = require('swagger-ui-express');
const { swaggerDocument } = require('../config/swagger');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.API_PORT || 3000;
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use('/', router);
    }

    listen() {
        this.app.listen(this.port, () => console.log(`listen at ${this.port}`));
    }
}

module.exports = Server;
