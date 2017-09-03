var auth = require('../auth');
var Navigate = require('libs/navigate');
var Login = require('libs/login');
var CasperConf = require('libs/casperinit');

var casper = require("casper").create(CasperConf.CasperCreateOptions);

casper.start();
casper.defaultWaitForTimeout = CasperConf.CasperDefaultWaitForTimeout;
casper.options.stepTimeout = CasperConf.CasperOptionsStepTimeout;
casper.userAgent(CasperConf.CasperUserAgent);

casper.thenOpen('https://www.instagram.com/');

casper = Login(casper, auth);
casper = Navigate.ToOwnUserProfile(casper);
casper = Navigate.ToFollowersList(casper);

var count = 0;

var number_followers = 0;

casper.then(function() {
    var result = this.evaluate(function () {
        return document.querySelector('a[href="/artiominsta/followers/"] > span').title;
    });
    number_followers = parseInt(result);
    console.log("Number of followers: " + number_followers);
});

var rec_start=0;

recursiveScroll(casper);

function recursiveScroll(c) {
    rec_start ++;
    c.then(function(){
        var scroll_value = 10000 * rec_start;
        console.log("scroll top value" + scroll_value);

        this.evaluate(function (scroll_value) {
            document.querySelector('._gs38e').scrollTop = scroll_value;
        }, scroll_value);

        console.log("recursive starts " + rec_start);
        count++;
        this.capture('screenshots/sh-' + count + '.jpg');
        this.wait(1000).then(function(){
            if (this.getElementsInfo("._6e4x5").length < number_followers) {
                console.log("Number of users loaded " + this.getElementsInfo("._6e4x5").length);
                recursiveScroll(c)
            } else {
                // Once all scrolled, parse results
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
