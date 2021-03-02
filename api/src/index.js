require('dotenv').config();
const Server = require('./app/server');
const { mongoService } = require('./services');
const CdiModule = require('./modules/cdi-module');

(async() => {
    try {
        console.log('app start');
        const app = new Server();
        await mongoService.connect();
        cdi = new CdiModule();
        if (!await cdi.hasDailyTax()) {
            await cdi.importTaxDays();
        }
        app.listen()
    } catch (e) {
        console.error(e);
        await mongoService.disconnect();
        process.exit(1);
    }
})();
