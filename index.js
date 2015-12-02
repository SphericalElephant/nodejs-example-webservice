'use strict';

const port = 8080;

const app = require('./app'),
mongoose = require('mongoose'); // mongodb framework

// connect to mongodb
mongoose.connect('mongodb://localhost/webserviceexample');

app.listen(port, function () {
    console.log('server started on port ' + port);
});