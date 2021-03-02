const cdiModule = require('../modules/cdi-module');
class CdiController {
    async loadTax(req, res) {
        try {
            const cdi = new cdiModule();
            await cdi.importTaxDays();
            return res.status(200).send('tax loaded');
        } catch (e) {
            console.log(e);
            return res.status(500).send('server error');
        }
    }
}

module.exports = CdiController;
