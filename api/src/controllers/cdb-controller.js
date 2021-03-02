const CdbModule = require('../modules/cdb-module');
class CdbController {
    async getCalculate(req, res) {
        try {

            console.log(req.query);

            if (!req.query.startPeriod) {
                return res.status(400).send('invalid params[startPeriod]');
            }

            if (!req.query.endPeriod) {
                return res.status(400).send('invalid params[endPeriod]');
            }

            if (!req.query.taxCdb) {
                return res.status(400).send('invalid params[taxCdb]');
            }

            const { startPeriod, endPeriod, taxCdb } = req.query;

            const cdb = new CdbModule();

            return res.status(200).send(await cdb.calculate(startPeriod, endPeriod, taxCdb));
        } catch (e) {
            console.log(e);
            return res.status(500).send('server error');
        }
    }
}

module.exports = CdbController;
