const moment = require('moment-timezone');
const CdiModel = require('../models/cdi-model');
const CdiModule = require('./cdi-module');

class CdbModule {

    async calculate(startPeriod, endPeriod, taxCdb, startInvestiment = 1000) {
        const cdi = new CdiModule();
        let cursor = CdiModel.find({
            date: {
                $gte: moment(startPeriod, 'YYYY-MM-DD').toDate(),
                $lt: moment(endPeriod, 'YYYY-MM-DD').toDate(),
            }
        }).sort({ date: 1 });
        let evolution = [];
        let result = 1;

        for await (const cdiDaily of cursor) {
            const tcdi = parseFloat(cdi.getTCDI(cdiDaily.tax).toFixed(8));
            result = result * ((1 + tcdi * (taxCdb / 100)));
            evolution.push({ date: moment(cdiDaily.date).format('DD/MM/YYYY'), result: parseFloat(result.toFixed(8)) * startInvestiment});
        }

        return { result: parseFloat(result.toFixed(8)) * startInvestiment, evolution };
    }
}

module.exports = CdbModule;
