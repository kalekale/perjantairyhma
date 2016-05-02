var Promise = require('bluebird');
var mongojs = require('mongojs');

//var db = mongojs('mongodb://localhost:27017/perjantairyhma', ['references']);
var db = mongojs('mongodb://kalekale:gooD7soh@ds021731.mlab.com:21731/heroku_r7zfx7t4', ['references']);

Promise.promisifyAll(db['references']);

module.exports = db;