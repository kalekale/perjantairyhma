var Promise = require('bluebird');
var mongojs = require('mongojs');

var db = mongojs('mongodb://localhost:27017/perjantairyhma', ['references']);

Promise.promisifyAll(db['references']);

module.exports = db;