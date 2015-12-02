'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');

// the user schema
var User = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, validate: validator.isEmail}, // validate accepts any function
    // arbitrary data
    info: {type: Schema.Types.Mixed}
});

// creating a model from our schema and exporting it
module.exports = mongoose.model('User', User);
