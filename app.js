'use strict';

const port = 8080;

const express = require('express'), // require express module (global)
    bodyParser = require('body-parser'), // require bodyparser module (required for JSON parsing)
    mongoose = require('mongoose'), // mongodb framework
    app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/webserviceexample');

// attaching parser to express instance (middleware)
// express uses middlewares sequentially, so this is the
// first one that gets req, res, next passed to it
app.use(bodyParser.json());

// load our routes
require('./route')(app);

// we don't need no, faviconization
app.use(function (req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        return res.status(200);
    }
    return next();
});

// error handler
app.use(function (err, req, res, next) {
    console.log('Error:', err);
    res.status(500).send({success: false, error: err});
});

module.exports = app;