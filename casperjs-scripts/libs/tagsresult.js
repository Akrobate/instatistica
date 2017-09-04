
function ParseRecentMedia (c) {
    return c
        .evaluate(function () {
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
}

module.exports.ParseRecentMedia = ParseRecentMedia;
