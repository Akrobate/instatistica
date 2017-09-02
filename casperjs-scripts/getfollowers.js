var auth = require('../auth');
var Navigate = require('libs/navigate');
var Login = require('libs/login');

var casper = require("casper").create({
    viewportSize: {
        width: 1920,
        height: 1080
    },
    waitTimeout: 125000
});

casper.start();
casper.defaultWaitForTimeout = 20000;
casper.options.stepTimeout = 20000;
casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');

casper.thenOpen('https://www.instagram.com/');

casper = Login(casper, auth);
casper = Navigate.ToOwnUserProfile(casper);
casper = Navigate.ToFollowersList(casper);

var count = 0;

/*
this.evaluate(function () {
    //document.querySelector('a[href="/artiominsta/followers/"] > span').title;
});
*/

recursiveScroll(casper);

var rec_start=0;

function recursiveScroll(c) {
    rec_start ++;
    c.then(function(){
        this.evaluate(function () {
            document.querySelector('._gs38e').scrollTop = 100000;
        });
        console.log("recursive starts " + rec_start);
        count++;
        this.capture('screenshots/sh-' + count + '.jpg');
        this.wait(1000).then(function(){
            if (this.getElementsInfo("._6e4x5").length < 140) {
                console.log("Number of users loaded " + this.getElementsInfo("._6e4x5").length);
                recursiveScroll(c)
            } else {
                parse_user_list_results(c);
            }
        });
    });
}


function parse_user_list_results(c) {
    c.then(function() {
        var list_users = this.evaluate(function(){
            // Getting links to other pages to scrape, this will be
            // a primitive array that will be easily returned from page.evaluate
            var users = [].map.call(document.querySelectorAll("._pg23k"), function(link) {
                console.log(link.href);
                return link.href;
            });
            return users;
        });
        console.log(list_users);
        console.log("nbr users " + list_users.length);
        console.log(list_users[0]);
    });
}

casper.run();
