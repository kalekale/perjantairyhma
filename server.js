
var path = require('path');
var express = require("express");
var session = require('express-session');
var multer = require('multer');
var db = require('./db');
var bodyParser = require('body-parser');

var app = express();
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());


app.get('/',function(req,res){
  res.send(200);
});

app.use('/', express.static(path.join(__dirname, 'dist')));




app.listen(3000,function(){
    console.log("Working on port 3000");
});