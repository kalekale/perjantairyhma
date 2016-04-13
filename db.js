var Promise = require('bluebird');
var mongojs = require('mongojs');

var db = mongojs('mongodb://localhost:27017/perjantairyhma', ['projects', 'users']);

Promise.promisifyAll(db['projects']);

module.exports = db;