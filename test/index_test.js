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
  describe('can add valid Article', function() {

  	before(function(done) {
  		browser
    	//.select('select', 'Article') korjaa
    	.fill('authorA', 'Matti')
        .fill('titleA', 'Minun viite')
        .pressButton('Add', done);


  	});
	
	it('article form is shown', function() {
		console.log(browser.html());
		
      	browser.assert.text('addType', 'Add new article reference:');
    });

    it('should list new reference', function() {
	      var list=browser.text('a');
	      var boolean=list.indexOf('Author: Matti, Title: Minun viite, Type: article')>-1;
	      expect(boolean).to.be(true);
    });
  });

  describe('can not add invalid Article', function() {
  
  before(function(done) {
      browser
      .select('select', 'Article')
      .fill('authorA', 'Matti')
        .fill('titleA', 'Minuen viite')
        .pressButton('Add', done);


    });
  
  it('form is shown', function() {
      browser.assert.success();
    });

    it('should list new reference', function() {
        var list=browser.text('a');
        var boolean=list.indexOf('Author: Matti, Title: Minuen viite, Type: Article')>-1;
        expect(boolean).to.be(false);
    });
  });

 //INPROCEEDING TEST
 describe('can add valid Inproceeding', function() {

    before(function(done) {
      browser
      //.select('select', 'Article') korjaa
      .fill('authorI', 'Matti')
        .fill('titleI', 'Minun viite')
        .pressButton('Add', done);


    });
  
  it('Inproceeding form is shown', function() {
    console.log(browser.html());
    
        browser.assert.text('addType', 'Add new article reference:');
    });

    it('should list new reference', function() {
        var list=browser.text('a');
        var boolean=list.indexOf('Author: Matti, Title: Minun viite, Type: article')>-1;
        expect(boolean).to.be(true);
    });
  });

  describe('can not add invalid Inproceeding', function() {
  
  before(function(done) {
      browser
      .select('select', 'Article')
      .fill('authorI', 'Matti')
        .fill('titleI', 'Minuen viite')
        .pressButton('Add', done);


    });
  
  it('form is shown', function() {

    });

    it('should list new reference', function() {
        var list=browser.text('a');
        var boolean=list.indexOf('Author: Matti, Title: Minuen viite, Type: Article')>-1;
        expect(boolean).to.be(false);
    });
  });

    //BOOK TESTS
   describe('can add valid Book', function() {

    before(function(done) {
      browser
      .fill('authorB', 'Matti')
        .fill('titleB', 'Minsun viite')
        .pressButton('Add', done);


    });
  
  it('Book form is shown', function() {
        console.log(browser.html());
    
        browser.assert.text('addType', 'Add new book reference:');
    });

    it('should list new reference', function() {
        var list=browser.text('a');
        var boolean=list.indexOf('Author: Matti, Title: Minsun viite, Type: article')>-1;
        expect(boolean).to.be(true);
    });
  });


  describe('can not add invalid Book', function() {
	
	before(function(done) {
  		browser
    	.select('select', 'Book')
    	.fill('authorB', 'Matti')
        .fill('titleB', 'Manun viite')
        .pressButton('Add', done);


  	});
	
	it('form is shown', function() {
      browser.assert.success();
    });

    it('should list new reference', function() {
	      var list=browser.text('a');
	      var boolean=list.indexOf('Author: Matti, Title: Manun viite, Type: Book')>-1;
	      expect(boolean).to.be(false);
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
