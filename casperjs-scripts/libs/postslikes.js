function CheckIsLiked(c) {
    return c
        .evaluate(function() {
                var result = true;
                // ._eszkz > span.coreSpriteHeartOpen'
                if (document.querySelector('._eszkz > span.coreSpriteHeartFull') === null) {
                    result = false;
                }
                return result;
        });
}

function LikePost(c) {
    return c
        .thenClick('a._eszkz')
        .waitForSelector("._eszkz > span.coreSpriteHeartFull");
}
// casper.thenClick('a._eszkz');
// casper.waitForSelector("._eszkz > span.coreSpriteHeartFull");

module.exports.CheckIsLiked = CheckIsLiked;
module.exports.LikePost = LikePost;
