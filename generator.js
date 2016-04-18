var fs = require('fs');
var db = require('./db');
var _ = require('lodash');

function writeFile() {

	db.references.findAsync()
	.then(function(allRefs) {
		var stream = fs.createWriteStream("my_file.txt");
		stream.once('open', function(fd) {
  		console.log(allRefs[0].type)
  		_.map(allRefs, function(ref) {
  			stream.write('@' + ref.type + '{');
  			stream.write('\n');
  			_.mapValues(ref, function(value, prop) {
  				stream.write(prop + ' = {' + value + '}\n');
  			})
  			stream.write('}');
  		})
  		stream.end();
		});
	})
};
module.exports = {
	writeFile: writeFile,
}

