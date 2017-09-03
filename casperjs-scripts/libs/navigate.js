function ToOwnUserProfile(c) {
    return c
        // Click on own profile link
        .waitForSelector(".coreSpriteDesktopNavProfile").thenClick(".coreSpriteDesktopNavProfile")
        .waitForSelector("._l8yre");
}

function ToFollowersList(c) {
    return c
        // Click on own profile link
        .waitForSelector('a[href="/artiominsta/followers/"]')
        .thenClick('a[href="/artiominsta/followers/"]')
        .waitForSelector("._l8yre")
        .waitForSelector("._784q7")
        .waitForSelector("._8q670");
}

function ToTag(c, tag_name) {
    return c.thenOpen('https://www.instagram.com/explore/tags/'+tag_name+'/');
}


module.exports.ToOwnUserProfile = ToOwnUserProfile;
module.exports.ToFollowersList = ToFollowersList;
module.exports.ToTag = ToTag;
