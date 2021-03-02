const CdbModule = require('../modules/cdb-module');
const moment = require('moment-timezone');
class CdbController {
    async getCalculate(req, res) {
        try {

            if (!req.query.investmentDate || !moment(req.query.investmentDate, 'YYYY-MM-DD', true).isValid()) {
                return res.status(400).send('invalid params[investmentDate]');
            }

            if (!req.query.currentDate || !moment(req.query.currentDate, 'YYYY-MM-DD', true).isValid()) {
                return res.status(400).send('invalid params[currentDate]');
            }

            if (!req.query.cdbRate || isNaN(req.query.cdbRate)) {
                return res.status(400).send('invalid params[cdbRate]');
            }

            const { investmentDate, currentDate, cdbRate } = req.query;

            const cdb = new CdbModule();

            return res.status(200).send(await cdb.calculate(investmentDate, currentDate, cdbRate));
        } catch (e) {
            console.log(e);
            return res.status(500).send('server error');
        }
    }
}

module.exports = CdbController;
