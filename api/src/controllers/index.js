const MainController = require('./main-controller');
const CdbController = require('./cdb-controller');
const CdiController = require('./cdi-controller');

exports.mainController = new MainController();
exports.cdbController = new CdbController();
exports.cdiController = new CdiController();
