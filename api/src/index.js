require('dotenv').config();
const Server = require('./app/server');
const { mongoService } = require('./services');

(async() => {
    try {
        console.log('app start');
        const app = new Server();
        await mongoService.connect();
        app.listen()
    } catch (e) {
        console.error(e);
        await mongoService.disconnect();
        process.exit(1);
    }
})();
