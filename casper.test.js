var auth = require('./auth');

console.log(auth.username);


//var casper = require("casper").create();
var casper = require("casper").create({
    // other options here
    viewportSize: {
        width: 1920,
        height: 1080
    },
    waitTimeout: 125000
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
    this.sendKeys('input[name="username"]', auth.username);
    this.sendKeys('input[name="password"]', auth.password);
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
    this.waitForSelector("._qv64e").thenClick("._qv64e");
});

casper.then(function() {
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
});

casper.waitForSelector("._7b8eu").then(function() {
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
});

//casper.thenOpen('https://www.instagram.com/artiominsta/');


casper.then(function() {
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
    console.log("capture single");
    console.log(count);
    this.waitForSelector(".coreSpriteDesktopNavProfile").thenClick(".coreSpriteDesktopNavProfile");
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
});

casper.waitForSelector("._l8yre").then(function() {
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
});

casper.then(function() {
    count++;
    this.waitForSelector('a[href="/artiominsta/followers/"]').thenClick('a[href="/artiominsta/followers/"]');
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
});



/*
casper.then(function() {
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
    console.log("capture single");
    console.log(count);
    this.waitForSelector(".t98z6").thenClick(".t98z6");
    count++;
    this.capture('screenshots/sh-' + count + '.jpg');
});
*/

casper.then(function() {
    this.waitForSelector("._784q7").then(function() {
        count++;
        console.log(count);
        this.capture('screenshots/sh-' + count + '.jpg');

        console.log("Before All users followers loaded ");

/*
        this.evaluate(function () {
            //document.querySelector('a[href="/artiominsta/followers/"] > span').title;
        });
        */
        console.log("All users followers: " + nb);

    });

});

// Wait for list to be available
casper.then(function() {
    this.waitForSelector("._8q670").then(function() {
        count++;
        console.log(count);
        this.capture('screenshots/sh-' + count + '.jpg');
    });
});


casper.then(function() {


    count++;
    console.log(count);

    //this.sendKeys('._8q670', casper.page.event.key.Down , {keepFocus: true});



    this.evaluate(function () {
        document.querySelector('._gs38e').scrollTop = 400;
    });




    console.log("Here... waiting...");
        this.wait(2000);
    console.log("Here... waiting... ended");

    this.capture('screenshots/sh-' + count + '.jpg');
});

recursiveScroll(casper);

var rec_start=0;

function recursiveScroll(c) {
    rec_start ++;
    //_jfct1
    //
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
