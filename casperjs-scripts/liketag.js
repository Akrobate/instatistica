var fs = require('fs');
var auth = require('../auth');
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
casper = Navigate.ToTag(casper, tag_name)

var count = 0;

var all_founded_tags = [];

// parse visible elements
casper.then(function() {
    var result = TagsResult.ParseRecentMedia(this);
    console.log("Number of parsed posts: " + result.length);
    var json_string = JSON.stringify(result);
    fs.write(output_data_file, json_string, 'w');
    this.capture('screenshots/sh-' + count + '.jpg');
    // strore all posts localy
    all_founded_tags = result;
});


var rep = 0;
casper.then(function() {
    this.repeat(all_founded_tags.length, function() {
        // test to like first result
        this.then(function(){
            console.log(all_founded_tags[rep].url);
            this.thenOpen(all_founded_tags[rep].url);
            rep++;
            count++;
            this.capture('screenshots/sh-' + count + '.jpg');
        });

        // check if element is not already liked
        this.then(function(){
            var liked = Post.CheckIsLiked(this);
            console.log("Liked : " + liked);
            count++;
            this.capture('screenshots/sh-' + count + '.jpg');
            if (!liked) {
                Post.LikePost(this);
            }
        });
    });
});

casper.run();
