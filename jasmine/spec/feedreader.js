/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test that loops through each feed in the allFeeds object and ensures
        // it has a URL defined and that the URL is not empty.

        it('have URLs', function(){
          allFeeds.forEach(function(data){
            expect(data.url).toBeDefined();
            expect(data.url.length).not.toBe(0);
          });
        });

        // Test that loops through each feed in the allFeeds object and ensures
        // it has a name defined and that the name is not empty.

        it('have names', function(){
          allFeeds.forEach(function(data){
            expect(data.name).toBeDefined();
            expect(data.name.length).not.toBe(0);
          });
        });
    });

    // Test suite named "The menu"

    describe('The menu', function() {

        // Test that ensures the menu element is hidden by default.

        it('is hidden', function(){
          expect($('body.menu-hidden').length).not.toBe(0);
        });

        // Test that ensures the menu changes when the menu icon is clicked.

        it('menu opens and closes as it should', function(){
          $('.menu-icon-link').click();
          expect($('body').attr('class')).not.toBe('menu-hidden');
          $('.menu-icon-link').click();
          expect($('body').attr('class')).toBe('menu-hidden');
        });
    });

    // Test suite named "Initial Entries

    describe('Initial Entries', function(){

        // Test that ensures when loadFeed() is called and completes its work,
        // there is at least a single .entry element within the .feed container

        beforeEach(function(done){
          loadFeed(0, done);
        });

        it('have at least one entry', function(done){
          expect($('.feed .entry').length).not.toBe(0);
          done();
        });

    });

    // Test suite named "New Feed Selection"

    describe('New Feed Selection', function(){
        // Test that ensures when a new feed is loaded by the loadFeed function
        // that the content actually changes.

        var oldFirstTitle,
            newFirstTitle;
        beforeEach(function(done){
          loadFeed(0, function(){
            oldFirstTitle = $('.feed .entry-link:nth-child(1) .entry h2').html();

            loadFeed(1, function(){
              newFirstTitle = $('.feed .entry-link:nth-child(1) .entry h2').html();
              done();
            });

          });
        });

        it('should be different than first feed', function(){
          expect(oldFirstTitle).not.toEqual(newFirstTitle);
        });

    });
}());
