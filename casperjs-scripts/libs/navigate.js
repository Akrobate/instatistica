var ProfileParser = require('./profileparser');


function ToOwnUserProfile(c) {
    return c
        // Click on own profile link
        .waitForSelector(".coreSpriteDesktopNavProfile").thenClick(".coreSpriteDesktopNavProfile")
        .waitForSelector("._l8yre");
}

function ToFollowersList(c) {
    return ProfileParser.getName(c, function(name) {
        // Click on own profile link
        return c
            .waitForSelector('a[href="/' + name + '/followers/"]')
            .thenClick('a[href="/' + name + '/followers/"]')
            .waitForSelector("._l8yre")
            .waitForSelector("._784q7")
            .waitForSelector("._8q670");
    });
}


function ToFollowingList(c) {
    return ProfileParser.getName(c, function(name) {
        return c
            // Click on own profile link
            .waitForSelector('a[href="/' + name + '/following/"]')
            .thenClick('a[href="/' + name + '/following/"]')
            .waitForSelector("._l8yre")
            .waitForSelector("._784q7")
            .waitForSelector("._8q670");
    });
}


function ToTag(c, tag_name) {
    return c.thenOpen('https://www.instagram.com/explore/tags/'+tag_name+'/');
}


module.exports.ToOwnUserProfile = ToOwnUserProfile;
module.exports.ToFollowersList = ToFollowersList;
module.exports.ToFollowingList = ToFollowingList;
module.exports.ToTag = ToTag;
