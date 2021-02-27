const CdbModule = require('../modules/cdb-module');
class CdbController {
    async getEvolution(req, res) {
        try {
            if (!req.body.startPeriod) {
                return res.status(400).send('startPeriod');
            }

            if (!req.body.endPeriod) {
                return res.status(400).send('endPeriod');
            }

            if (!req.body.taxCdb) {
                return res.status(400).send('invalid params[taxCdb]');
            }

            const { startPeriod, endPeriod, taxCdb } = req.body;

            const cdb = new CdbModule();

            return res.status(200).send(await cdb.getEvolution(startPeriod, endPeriod, taxCdb));
        } catch (e) {
            console.log(e);
            return res.status(500).send('server error');
        }
    }
}

module.exports = CdbController;
