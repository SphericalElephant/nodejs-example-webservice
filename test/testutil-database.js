'use strict';

var mongoose = require('mongoose');

var User = require('../model').User;

function TestUtilDatabase() {

}

TestUtilDatabase.tearDownDb = function (done) {
    User.remove({}, done);
};

TestUtilDatabase.connect = function (done) {
    mongoose.connect('mongodb://localhost/webserviceexample', done);
};

TestUtilDatabase.disconnect = function (done) {
    mongoose.disconnect(done);
};

module.exports = TestUtilDatabase;