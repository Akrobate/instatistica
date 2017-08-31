
//var casper = require("casper").create();
var casper = require("casper").create({
    // other options here
    viewportSize: {
        width: 1920,
        height: 1080
    },
    waitTimeout: 25000
});
var count = 0;

/*
casper.start(function(){
    this.viewport(1600,1200);
});

*/

casper.start();

casper.defaultWaitForTimeout = 20000;
casper.options.stepTimeout = 20000;

casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');
casper.thenOpen('https://www.instagram.com/');
casper.then(function() {
    this.capture('screenshots/sh-' + count + '.jpg');
});

casper.then(function() {
    this.waitForSelector("._b93kq").thenClick("._b93kq");

});
casper.then(function() {
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
});

casper.then(function() {
    this.sendKeys('input[name="username"]', '');
    this.sendKeys('input[name="password"]', '');
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
    this.waitForSelector("._qv64e").thenClick("._qv64e");
});

casper.then(function() {
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
});

/*
casper.waitForSelector("._7b8eu", function() {
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
}, function _onTimeout(){
    this.echo("#thing_" + filename + " not found", "WARNING");
});
*/


casper.waitForSelector("._7b8eu").then(function() {
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
});


casper.thenOpen('https://www.instagram.com/artiominsta/');
casper.then(function() {
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
});

    casper.run();
