require('dotenv').config();
const Server = require('./app/server');

(async() => {
    try {
        console.log('app start');
        const app = new Server();
        app.listen()
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
