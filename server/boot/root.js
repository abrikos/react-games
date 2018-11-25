let Models = require('../model-config');

module.exports = function (server) {
    // Install a `/` route that returns server status
    var router = server.loopback.Router();
    router.get('/', server.loopback.status());
    router.get('/list-models', (req, res) => {
        //let test = server.models('Minesweeper');
        res.send(Object.keys(Models))
    });
    server.use(router);

};
