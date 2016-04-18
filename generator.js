var fs = require('fs');
var db = require('./db');
var _ = require('lodash');

function writeFile() {

	db.references.findAsync()
	.then(function(allRefs) {
		var stream = fs.createWriteStream("my_file.txt");
		stream.once('open', function(fd) {
  		stream.write("My first row\n");
  		stream.write("My second row\n");
  		console.log(allRefs[0].type)
  		_.map(allRefs, function(ref) {
  			stream.write('@');
  			stream.write(ref.type)
  		})
  		stream.end();
		});
	})
};
module.exports = {
	writeFile: writeFile,
}

