const csv = require('csv-parser');
const fs = require('fs');
const moment = require('moment-timezone');

const CdiModel = require('../models/cdi-model');

class CdiModule {

    getTCDI(cdi) {
        return (((cdi / 100) + 1) ** (1 / 252)) - 1;
    }

    async hasDailyTax() {
        if (await CdiModel.count()) {
            return true
        }

        return false;
    }

    async importTaxDays() {

        await CdiModel.deleteMany({});

        const promise = new Promise(function(resolve, reject) {
            fs.createReadStream(`/files/${process.env.CDI_FILE_NAME}`)
            .pipe(csv())
            .on('data', (row) => {
                const cdiTaxDay = {
                    date: moment(row.dtDate, 'DD/MM/YYYY').toDate(),
                    tax: row.dLastTradePrice
                };
                const cdi = new CdiModel(cdiTaxDay);
                cdi.save();
            })
            .on('error', (e) => {
                reject
            })
            .on('end', () => {
                resolve();
            })
        });

        return promise;
    }
}

module.exports = CdiModule;
