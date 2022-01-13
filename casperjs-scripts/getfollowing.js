// @Todo: Remove this script after moving to puppeter

var fs = require('fs');
var auth = require('../auth');
var Navigate = require('libs/navigate');
var Login = require('libs/login');
var CasperConf = require('libs/casperinit');
var ProfileParser = require('libs/profileparser');

// Params
var output_data_file = "./data/following.json";

var casper = require("casper").create(CasperConf.CasperCreateOptions);
casper.start();
casper.defaultWaitForTimeout = CasperConf.CasperDefaultWaitForTimeout;
casper.options.stepTimeout = CasperConf.CasperOptionsStepTimeout;
casper.userAgent(CasperConf.CasperUserAgent);

casper.thenOpen('https://www.instagram.com/');

casper = Login(casper, auth);
casper = Navigate.ToOwnUserProfile(casper);

casper = Navigate.ToFollowingList(casper);


var my_username = null;

casper.then(function() {
    ProfileParser.getName(casper, function(name){
        my_username = name;
        console.log("User name : " + my_username);
    });
});


var count = 0;
var number_following = 0;

casper.then(function() {
    var result = this.evaluate(function (my_username) {
        return document.querySelector('a[href="/' + my_username + '/following/"] > span').textContent;
    }, my_username);
    number_following = parseInt(result);
    console.log("Number of followers: " + number_following);
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
            if (this.getElementsInfo("._6e4x5").length < number_following) {
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
            var users = [].map.call(document.querySelectorAll("._f5wpw"), function(user_div) {
                var user = {
                    photo: user_div.querySelector('._rewi8').src,
                    url: user_div.querySelector('._pg23k').href,
                    name: user_div.querySelector('._2g7d5').title,
                    fullname: user_div.querySelector('._9mmn5').textContent,
                };
                return user;
            });
            return users;
        });
        console.log("Number of parsed users: " + list_users.length);
        var json_string = JSON.stringify(list_users);
        fs.write(output_data_file, json_string, 'w');
    });
}

casper.run();
