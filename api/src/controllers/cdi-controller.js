const moment = require('moment');
const csv = require('csv-parser');
const fs = require('fs');
const CdiModel = require('../models/cdi-model');

class CdiController {
    async loadFees(req, res) {
        try {
            await CdiModel.deleteMany({});
            fs.createReadStream(`/src/files/${process.env.CDI_FILE_NAME}`)
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
                throw e;
            })
            .on('end', () => {
                return res.status(200).send('fees load');
            });
        } catch (e) {
            console.log(e);
            return res.status(500).send('server error');
        }
    }
}

module.exports = CdiController;
