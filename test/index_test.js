const Browser = require('zombie');
var assert = require('assert');
var app = require("../server.js");


describe('When visiting the main page', function(){
	browser = new Browser();

	before(function(done){
		this.server = http.createServer(app).listen(3000);
		this.browser = new Browser({ site: "http://localhost:3000" });
	});

	beforeEach(function(done){
		this.browser.visit("/", done);
	});

	describe('it works!!', function(){
		// assert(1==1);
		browser.assert.success();
		// browser.assert.text("Add new Article reference");
	});
});
