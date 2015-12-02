'use strict';

const express = require('express'),
    router = express.Router(),
    User = require('../model').User,
    _ = require('lodash');

router.post('/', function (req, res, next) {
    var sanitizedInput = _.pick(req.body, ['email', 'name', 'info']);
    User.create(sanitizedInput, function (err, user) {
        // calling the next middleware in line with error (in this case our error handler)
        if (err) return next(err);
        res.status(201).send({success: true, message: 'user created', payload: user});
    });
});

router.get('/', function (req, res, next) {
    var filter;

    if (req.query.filter) {
        filter = req.query.filter.split('|');
    }

    filter = filter || [];

    var projection = {};
    projection._id = 0;

    // first filter, then unique, then add to projection
    _.unique(_.filter(filter, function (item) {
        return item === 'email' || item === 'name'; // only allow name and email filter
    })).forEach(function (item) {
        projection[item] = 1; // access object via array annotation (dynamic!)
    });

    var aggregate = User.aggregate({$match: {}});
    aggregate.append({$project: projection});
    aggregate.exec(function (err, users) {
        // calling the next middleware in line with error (in this case our error handler)
        if (err) return next(err);
        return res.status(200).send({success: true, message: 'users', payload: users});
    });
});

// exporting the router (module) will make it available to other parts of the code
module.exports = router;