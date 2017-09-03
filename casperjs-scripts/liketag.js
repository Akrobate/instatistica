var fs = require('fs');
var auth = require('../auth');
var Navigate = require('libs/navigate');
var Login = require('libs/login');
var CasperConf = require('libs/casperinit');

// Params
var tag_name = 'like4like';
var tag_name = '16f84';
var output_data_file = "./data/liketags_results.json";

var casper = require("casper").create(CasperConf.CasperCreateOptions);
casper.start();
casper.defaultWaitForTimeout = CasperConf.CasperDefaultWaitForTimeout;
casper.options.stepTimeout = CasperConf.CasperOptionsStepTimeout;
casper.userAgent(CasperConf.CasperUserAgent);

casper.thenOpen('https://www.instagram.com/');

casper = Login(casper, auth);
casper = Navigate.ToTag(casper, tag_name)

var count = 0;
var number_followers = 0;

var all_founded_tags = [];

// parse visible elements
casper.then(function() {

    var result = this.evaluate(function () {

        var main_posts_bloc = null;
        // Define if has popular section or not  _jzhdd
        if (document.querySelector('._jzhdd > ._nhglx') === null) {
            main_posts_bloc = document.querySelector('._jzhdd > div');
        } else {
            main_posts_bloc = document.querySelectorAll('._jzhdd > div')[1];
        }

        // class of each post: ._mck9w
        var posts = [].map.call(main_posts_bloc.querySelectorAll("._mck9w"), function(post_div) {
            var post = {
                photo: post_div.querySelector('._2di5p').src,
                url: post_div.querySelector('a').href,
                alt: post_div.querySelector('._2di5p').alt,
            };
            return post;
        });
        return posts;

    });

    console.log("Number of parsed posts: " + result.length);
    var json_string = JSON.stringify(result);
    fs.write(output_data_file, json_string, 'w');

    this.capture('screenshots/sh-' + count + '.jpg');

    // strore all posts localy
    all_founded_tags = result;

});


// test to like first result
casper.then(function(){
    this.thenOpen(all_founded_tags[0].url);
    console.log(all_founded_tags[0].url);
});
//casper.thenOpen(all_founded_tags[0].url);


casper.then(function(){

    var liked = this.evaluate(function() {
        var result = true;
        // ._eszkz > span.coreSpriteHeartOpen'
        if (document.querySelector('._eszkz > span.coreSpriteHeartFull') === null) {
            result = false;
        }
        return result;
    });

    this.capture('screenshots/sh-' + count + '.jpg');
    this.then(function() {
        console.log("Liked : " + liked);
        console.log("Last then...");
    });
});

casper.run();
