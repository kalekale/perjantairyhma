
var path = require('path');
var express = require("express");
var session = require('express-session');
var db = require('./db');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());	


app.get('/',function(req,res){
  res.send(200);
});

app.use('/', express.static(path.join(__dirname, 'dist')));

app.post('/new', function(req, res) {

	db.reference.Asyncupdate(
		{ project: req.params.projectID},
		{ $push:
			{references: req.body.reference}
		}
	)
 	.then(function() {
    res.sendStatus(200);
  });
});

app.get('/get', function(req, res) {
	db.reference.Asyncfind( { "projectID" : req.params.projectID } );

})


app.listen(3000,function(){
    console.log("Working on port 3000");
});