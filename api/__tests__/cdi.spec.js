const CdiModule = require('../src/modules/cdi-module');

describe('Cdi Test', () => {

    it('calculate tcdi', async () => {
        const cdi = new CdiModule();

        let tcdi = cdi.getTCDI(13.88);
        expect(tcdi).toBe(0.0005159071471232402);
        tcdi = cdi.getTCDI(13.63);
        expect(tcdi).toBe(0.000507181628455422);
    });

})
