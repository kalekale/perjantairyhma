process.env.NODE_ENV = "test";

var expect = require('expect.js');
var app = require("../server.js");
var http = require("http");


const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('User visits mainpage', function() {
	//todo tyhjennä kaikki
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

  //TEST ARTICLE
  describe('adds valid Article', function() {

  	before(function(done) {
  		browser
    	//.select('select', 'Article') korjaa
    	  .fill('authorA', 'Matti')
        .fill('titleA', 'Minun viite')
        .pressButton('Add', done);
  	});

    it('it is added to the listing', function() {
	      var list=browser.text('a');
	      var boolean=list.indexOf('Author: Matti, Title: Minun viite, Type: article')>-1;
	      expect(boolean).to.be(true);
    });
  });

  describe('when adding an invalid Article', function() {
  
  before(function(done) {
      Browser
        .fill('authorA', 'Matti')
        .fill('titleA', '')
        .pressButton('Add', done);
    });

    it('it should not be listed', function() {
        var list=browser.text('a');
        var boolean=list.indexOf('Author: Matti, Title: , Type: article')>-1;
        expect(boolean).to.be(false);
    });
  });

 //INPROCEEDING TEST
 describe('can add a valid Inproceeding', function() {

    before(function(done) {
      browser
        .fill('authorI', 'Mattis')
        .fill('titleI', 'Minusn viite')
        .pressButton('Add', done);
    });

    it('should list new reference', function() {
        var list=browser.text('a');
        var boolean=list.indexOf('Author: Mattis, Title: Minusn viite, Type: inproceeding')>-1;
        expect(boolean).to.be(true);
    });
  });

  describe('can not add an invalid Inproceeding', function() {
  
  before(function(done) {
      browser
        .fill('authorI', 'Mattie')
        .fill('titleI', '')
        .pressButton('Add', done);
    });

    it('should list new reference', function() {
        var list=browser.text('a');
        var boolean=list.indexOf('Author: Mattie, Title: , Type: Article')>-1;
        expect(boolean).to.be(false);
    });
  });

   //BOOK TESTS
   describe('can add a valid Book', function() {

    before(function(done) {
      browser
        .fill('authorB', 'Mattis')
        .fill('titleB', 'Minsun viites')
        .pressButton('Add', done);
    });

    it('should list new reference', function() {
        var list=browser.text('a');
        var boolean=list.indexOf('Author: Mattis, Title: Minsun viites, Type: book')>-1;
        expect(boolean).to.be(true);
    });
  });


  describe('can not add invalid Book', function() {
	
	before(function(done) {
  		browser
    	.fill('authorB', 'Mattib')
      .fill('titleB', 'Manun viiteb')
      .pressButton('Add', done);
  	});

    it('should list new reference', function() {
	      var list=browser.text('a');
	      var boolean=list.indexOf('Author: Mattib, Title: Manun viiteb, Type: Book')>-1;
	      expect(boolean).to.be(false);
    });
  });

  //TEST BIBTEX ?? ?? ? ??? ?? ?? ??
    it('page contains bibtex generating button', function() {
      browser.assert.element('button', 'Generate Bibtext');
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
