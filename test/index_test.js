process.env.NODE_ENV = "test";
var Browser = require('zombie');
var expect = require('expect.js');
var app = require("../server.js");
var http = require("http");


describe('When visiting the main page', function(){
	browser = new Browser();

	before(function(done){
		this.server = app;
		this.browser = new Browser({ site: "http://localhost:3000" });
		done();
	});

	beforeEach(function(done){
		this.browser.visit("/", done);
		done();
	});

	it('at least something works', function(done){
		expect(1==1);
		done();
	});
});
