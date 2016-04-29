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

		//TEST BIBTEX ?? ?? ? ??? ?? ?? ??
		it('page contains bibtex generating button', function() {
			browser.assert.attribute('button', 'Generate Bibtext');
		});
	});

	describe('loads bibtex', function() {

		it('should download bibtex', function() {
			browser.fetch('http://localhost:3000/bib')
			.then(function(response) {
			console.log('Status code:', response.status);
			if (response.status === 200)
				browser.assert.success();
			})
			.then(function(text) {
				console.log('bibtex testattu');
			})
			.catch(function(error) {
				browser.assert.failure();
			});
		});
	});


	//TEST ARTICLE
	describe('adds valid Article', function() {

		before(function(done) {
			browser
			.select('select', 'Article')
			.fill('authorA', 'Matti')
			.fill('titleA', 'Minun viite')
			.fill('journalA', 'Maailmojen Sota II')
			.fill('yearA', '1917')
			.pressButton('Add', done);
		});

		it('it is added to the listing', function() {
				var list=browser.text('a');
				var boolean=list.indexOf('Author: Matti, Title: Minun viite, Type: article')>-1;
				expect(boolean).to.be(true);
		});
	});

	describe('when trying to add an invalid Article', function() {
	
	before(function(done) {
			browser
			.select('select', 'Article');
				browser.fill('authorA', 'Matti');
				done();
		});

		it('the button should be disabled', function() {
			browser.assert.attribute('#addReference', 'disabled', 'disabled');
			// var list=browser.text('a');
			// var boolean=list.indexOf('Author: Matti, Title: , Type: article')>-1;
			// expect(boolean).to.be(false);
		});
	});

 //INPROCEEDING TEST
 describe('can add a valid Inproceeding', function() {

		before(function(done) {
			browser
			.select('select', 'Inproceeding')
				.fill('authorI', 'Mattis')
				.fill('titleI', 'Minusn viite')
				.fill('bookTitleI', 'Minun Elämäni VII')
				.fill('yearI', '9253')
				.pressButton('Add', done);
		});

		it('should list new reference', function() {
				var list=browser.text('a');
				var boolean=list.indexOf('Author: Mattis, Title: Minusn viite, Type: inproceeding')>-1;
				expect(boolean).to.be(true);
		});
	});

	describe('when trying to add an invalid inproceeding', function() {
	
	before(function(done) {
			browser
			.select('select', 'Inproceeding');
				browser.fill('pagesI', 'eeeee')
				.fill('publisherI', 'ooooo')
				.fill('addressI', 'ooooo');
				done();
		});

		it('the button should be disabled', function() {
			
			browser.assert.attribute('#addInproceeding', 'disabled', 'disabled');
				// var list=browser.text('a');
				// var boolean=list.indexOf('Author: Mattie, Title: , Type: Article')>-1;
				// expect(boolean).to.be(false);
		});
	});

	 //BOOK TESTS
	 describe('can add a valid Book with author', function() {

		before(function(done) {
			browser
		.select('select', 'Book')
				.fill('authorB', 'Mattis')
				.fill('titleB', 'Minsun viites')
				.fill('publisherB', 'Matti\'s publishser')
				.fill('yearB', '2')
				.pressButton('Add', done);
		});

		it('should list new reference', function() {
				var list=browser.text('a');
				var boolean=list.indexOf('Author: Mattis, Title: Minsun viites, Type: book')>-1;
				expect(boolean).to.be(true);
		});
	});

	describe('can add a valid Book with editor', function() {

		before(function(done) {
			browser
		.select('select', 'Book')
				.fill('editorB', 'Mattiz')
				.fill('titleB', 'Minzun viites')
				.fill('publisherB', 'Matti\'z publishser')
				.fill('yearB', '3')
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
			
			.select('select', 'Book')
			.fill('publisherB', 'Mattib')
			.fill('yearB', 'Manun viiteb');
			done();
		});

		it('the button should be disabled', function() {
			
			browser.assert.attribute('#addBook', 'disabled', 'disabled');
		});


	});
	
	describe('updating works with correct values', function() {
	
		before(function(done) {
			browser
				.select('select', 'Book')
				.fill('authorB', 'Ma')
				.fill('titleB', 'My')
				.fill('publisherB', 'Matti\'z publishser')
				.fill('yearB', '3')
				.pressButton('Add', done);
		});

		it('clicking link opens the entry', function(done) {
			browser.clickLink('Author: Ma, Title: My, Type: book', function() {
				browser.assert.success();
				browser.assert.text('h1', '"My", type:book')
				browser.fill('author', 'Sipulisalaatti')
				browser.pressButton('Update')
				browser.visit('/', done);
			});
		});

		it('updating changes data', function() {
			var list=browser.text('a');
			var boolean=list.indexOf('Author: Sipulisalaatti, Title: My, Type: book')>-1;
			expect(boolean).to.be(true);
		});
	});

	describe('updating does not work with incorrect values', function() {
	
		before(function(done) {
			browser
				.select('select', 'Book')
				.fill('authorB', 'Maaa')
				.fill('titleB', 'Myyy')
				.fill('publisherB', 'Matti\'z publishser')
				.fill('yearB', '3')
				.pressButton('Add', done);
		});

		it('clicking link opens an entry, update button disabled with incorrect data', function(done) {
			browser.clickLink('Author: Maaa, Title: Myyy, Type: book', function() {
				browser.assert.success();
				browser.assert.text('h1', '"Myyy", type:book')
				browser.fill('author', '')
				browser.assert.attribute('#updateReference', 'disabled', 'disabled');
				browser.visit('/', done);
			});
		});

		it('data remains unchanged', function() {
			var list=browser.text('a');
			var boolean=list.indexOf('Author: Maaa, Title: Myyy, Type: book')>-1;
			expect(boolean).to.be(true);
		});
	});

	describe('deleting an entry', function() {
	
		before(function(done) {
			browser
        browser.assert.success(done);
		});

		it('clicking link opens an entry, delete button has functionality', function(done) {
			browser.clickLink('Author: Maaa, Title: Myyy, Type: book', function() {
				browser.assert.success();
				browser.assert.text('h1', '"Myyy", type:book')
				browser.pressButton('#deleteReference')
				browser.visit('/', done);
			});
		});

		it('deleted entry is gone', function() {
			var list=browser.text('a');
			var boolean=list.indexOf('Author: Mb, Title: Myb, Type: book')>-1;
			expect(boolean).to.be(false);
		});
	});
});