var fs = require('fs');
var db = require('./db');
var _ = require('lodash');

function writeFile(cb) {

	db.references.findAsync()
	.then(function(allRefs) {
		var stream = fs.createWriteStream("tmp/sources.bibtex");
		stream.once('open', function(fd) {
  		_.map(allRefs, function(ref) {
  			stream.write('@' + ref.type + '{' + ref._id + ',');
  			stream.write('\n');
  			_.mapValues(ref, function(value, prop) {
  				if (prop == 'type' || prop == '_id') {
  				} else {
  				stream.write(prop + ' = {' + value + '},\n');
  				}
  			})
  			stream.write('}\n\n');
  		})
  		stream.end();
  		stream.on('finish', function() {
  			cb();
  		})
		});
	})
};

function writeFile(allRefs, cb) {

    var stream = fs.createWriteStream("tmp/sources.bibtex");
    stream.once('open', function(fd) {
      _.map(allRefs, function(ref) {
        stream.write('@' + ref.type + '{' + ref._id + ',');
        stream.write('\n');
        _.mapValues(ref, function(value, prop) {
          if (prop == 'type' || prop == '_id') {
          } else {
          stream.write(prop + ' = {' + value + '},\n');
          }
        })
        stream.write('}\n\n');
      })
      stream.end();
      stream.on('finish', function() {
        cb();
      })
    });
};


module.exports = {
	writeFile: writeFile,
}

