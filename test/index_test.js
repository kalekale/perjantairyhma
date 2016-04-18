process.env.NODE_ENV = "test";

var expect = require('expect.js');
var app = require("../server.js");
var http = require("http");


const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('User visits mainpage', function() {

  browser = new Browser();

  before(function(done) {
    browser.visit('/', done);
  });

  describe('loads page', function() {

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see welcome page', function() {
      browser.assert.text('h1', 'References');
    });
  });

  describe('can add valid book', function() {

  	before(function(done) {
  		browser
    	.select('select', 'Book')
    	.fill('author', 'Matti')
        .fill('title', 'Minun viite')
        .pressButton('Add', done);


  	});
	
	it('book form is shown', function() {
      browser.assert.text('h2', 'Add new book reference:');
    });

    it('should list new reference', function() {
	      var list=browser.text('a');
	      var boolean=list.indexOf('Author: Matti, Title: Minun viite')>-1;
	      expect(boolean).to.be(true);
    });
  });


  describe('can not add invalid reference', function() {
	
	before(function(done) {
  		browser
    	.select('select', 'Article')
    	.fill('author', 'Matti')
        .fill('title', 'Minun viite')
        .pressButton('Add', done);


  	});
	
	it('form is shown', function() {
      browser.assert.success();
    });

    it('should list new reference', function() {
	      var list=browser.text('a');
	      var boolean=list.indexOf('Author: Matti, Title: Minun viite')>-1;
	      expect(boolean).to.be(true);
    });
  });
});

/*describe('When visiting the main page', function(){
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
		browser.assert.text("title","Refernece");
		done();
	});
});*/
