// @Todo: Remove this script after moving to puppeter

var fs = require('fs');
var auth = require('../auth');
var behaviour = require('../behaviour');
var Random = require("libs/random");
var Navigate = require('libs/navigate');
var Login = require('libs/login');
var CasperConf = require('libs/casperinit');
var Post = require('libs/postslikes');
var TagsResult = require('libs/tagsresult');
var Casper = require("casper");
var utils = require("utils");


// Params
var output_data_file = "./data/liketags_results.json";

var casper = Casper.create(CasperConf.CasperCreateOptions);
casper.start();
casper.defaultWaitForTimeout = CasperConf.CasperDefaultWaitForTimeout;
casper.options.stepTimeout = CasperConf.CasperOptionsStepTimeout;
casper.userAgent(CasperConf.CasperUserAgent);

if (casper.cli.args[0] === undefined) {
    casper.echo("Argument missing: First argument must be tag name");
    casper.exit();
}

casper.echo("tag: #" + casper.cli.args[0]);
var tag_name = casper.cli.args[0];

casper.thenOpen('https://www.instagram.com/');

casper = Login(casper, auth);


var count = 0;

var times_to_repeat_all = 100;

casper.repeat(times_to_repeat_all, function() {

    var all_founded_tags = [];


    var random_timeout_between_tags = Random.getRandomIntFromRange(behaviour.RANDOM_MIN_VALUE_BEFORE_LOAD_TAG, behaviour.RANDOM_MAX_VALUE_BEFORE_LOAD_TAG);
    console.log("Random value test between pages: " + random_timeout_between_tags);

    console.log("Waiting... ");

    this.wait(random_timeout_between_tags, function(){
        console.log('waiting ended');
    });


    this.then(function() {
        Navigate.ToTag(this, tag_name);
    });

    // parse visible elements
    this.then(function() {

        var result = TagsResult.ParseRecentMedia(this);
        console.log("Number of parsed posts: " + result.length);
        var json_string = JSON.stringify(result);
        fs.write(output_data_file, json_string, 'w');
        this.capture('screenshots/sh-' + count + '.jpg');
        // strore all posts localy
        all_founded_tags = result;
    });


    var rep = 0;
    this.then(function() {

        this.repeat(all_founded_tags.length, function() {

            // test to like first result
            this.then(function(){
                console.log(all_founded_tags[rep].url);
                this.thenOpen(all_founded_tags[rep].url);
                rep++;
            });

            var random_timeout_between_likes = Random.getRandomIntFromRange(behaviour.RANDOM_MIN_VALUE_BEFORE_LIKE,behaviour.RANDOM_MAX_VALUE_BEFORE_LIKE);
            console.log("Random value between likes: " + random_timeout_between_likes);

            this.wait(random_timeout_between_likes, function() {
                console.log("Waited : " + random_timeout_between_likes + "ms after page opening and before like");
            });

            // check if element is not already liked
            this.then(function(){
                var liked = Post.CheckIsLiked(this);
                console.log("Liked : " + liked);
                if (!liked) {
                    Post.LikePost(this);
                }
                this.wait(100, function() {
                    count++;
                    this.capture('screenshots/sh-' + count + '.jpg');
                })
            });
        });
    });
});

casper.run();
