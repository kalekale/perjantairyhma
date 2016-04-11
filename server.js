
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

app.post('/new', function(req. res) {

	db.reference.updateAsync(
		{ project: req.params.projectID},
		{ $push:
			{references: req.body.reference}
		}
	);
 	.then(() => {
    res.sendStatus(200);
  });
})


app.listen(3000,function(){
    console.log("Working on port 3000");
});