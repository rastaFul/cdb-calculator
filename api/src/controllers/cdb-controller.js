class CdbController {
    getEvolution(req, res) {
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

            return res.status(200).send(req.body);
        } catch (e) {
            return res.status(500).send('server error');
        }
    }
}

module.exports = CdbController;
