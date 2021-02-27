const moment = require('moment-timezone');
const CdiModel = require('../models/cdi-model');

class CdbModule {

    getTCDI(cdi) {
        return (((cdi / 100) + 1) ** (1 / 252)) - 1;
    }

    roundOff(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
      }

    async getEvolution(startPeriod, endPeriod, taxCdb) {
        let cursor = CdiModel.find({
            date: {
                $gte: moment(startPeriod, 'YYYY-MM-DD').toDate(),
                $lt: moment(endPeriod, 'YYYY-MM-DD').toDate(),
            }
        }).sort({ date: 1 });
        let evolution = [];
        let result = 1;

        for await (const cdi of cursor) {
            const tcdi = parseFloat(this.getTCDI(cdi.tax).toFixed(8));
            result = result * ((1 + tcdi * (taxCdb / 100)));
            evolution.push({ date: moment(cdi.date).format('DD/MM/YYYY'), result: parseFloat(result.toFixed(8)) });
        }

        return { result: parseFloat(result.toFixed(8)) * 1000, evolution };
    }
}

module.exports = CdbModule;
