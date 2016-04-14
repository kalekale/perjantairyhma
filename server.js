
var path = require('path');
var express = require("express");
var session = require('express-session');
var db = require('./db');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());	

app.use('/', express.static(path.join(__dirname)));

app.get('/getAll',function(req,res){
	
	db.references.findAsync()
	.then(function(all) {
		res.json(all);
	})  
});

app.post('/new', function(req, res) {
	db.references.insertAsync(
		req.body
	)
 	.then(function() {
    res.sendStatus(200);
  });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});