
var path = require('path');
var express = require("express");
var session = require('express-session');
var db = require('./db');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var generator = require('./generator')
var mime = require('mime');
var ObjectId = mongojs.ObjectId;
var app = express();

app.use(bodyParser.json());	

app.use('/', express.static(path.join(__dirname)));

//get all refs
app.get('/getAll',function(req,res){
	db.references.findAsync()
	.then(function(all) {
		res.json(all);
	});  
});

//create new ref
app.post('/new', function(req, res) {
	db.references.insertAsync(
		req.body
	)
 	.then(function() {
    res.sendStatus(200);
  });
});

app.get('/bib', function(req, res) { 
	generator.writeFile(function() {
		var file = __dirname + '/tmp/sources.bibtex';
  		res.download(file);
	})
})

//ger ref by id
app.get('/:id', function(req,res){
	console.log("get id");
	db.references.findOneAsync({_id: ObjectId(req.params.id)})
	.then(function(ref){
		res.json(ref);
	});
});

//update ref
app.put('/:id', function(req,res){
	console.log("posting update in server.js");
	delete req.body['_id'];
	db.references.updateAsync(
	{ _id: ObjectId(req.params.id)},
	req.body
	)
	.then(function(ref){
		console.log("update onnistuu");
		res.json(ref);
	});
});

//delete ref by id
app.delete('/:id', function(req,res){
	db.references.removeAsync({_id: ObjectId(req.params.id)})
	.then(function(ref){
		res.sendStatus(200);
	});
});


app.listen(process.env.PORT || 3000, function(){
  console.log('listening...');
});