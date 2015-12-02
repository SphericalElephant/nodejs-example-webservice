'use strict';

const port = 8080;

const app = require('./app');

app.listen(port, function () {
    console.log('server started on port ' + port);
});