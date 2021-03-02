const moment = require('moment-timezone');
const dbHandler = require('./db-handler');
const CdbModule = require('../src/modules/cdb-module');
const CdiModel = require('../src/models/cdi-model');

describe('Cdb Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server
    // By using mongoose.connect
    beforeAll(async () => {
        await dbHandler.connect();

        const days = ['2016-11-14', '2016-11-16', '2016-11-17', '2016-11-18', '2016-11-21', '2016-11-22', '2016-11-23', '2016-11-24', '2016-11-25', '2016-11-28', '2016-11-29', '2016-11-30'];

        for (let date of days) {
            const cdiTaxDay = {
                date: moment(date).toDate(),
                tax: 13.88
            };
            const cdi = new CdiModel(cdiTaxDay);
            await cdi.save();
        }

    });

    it('calculate evolution investiment cdb', async () => {
        const cdb = new CdbModule();

        const calc = await cdb.calculate('2016-11-14', '2016-11-30', 103.5);

        expect(calc.result).toBe(1005.88934);
        expect(calc.evolution[0]).toStrictEqual({
            date: "14/11/2016",
            result: 1000.53397
        });
        expect(calc.evolution[10]).toStrictEqual(        {
            "date": "29/11/2016",
            "result": 1005.88934
        });
    });

})
