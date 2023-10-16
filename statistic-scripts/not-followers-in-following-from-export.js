'use strict';

const {
    argv,
} = process;
const {
    JsonFileRepository,
} = require('../repositories');
const path = require('path');

const param = argv[argv.length - 1];
if (param === __filename) {
    console.log('No parameter passed');
    // eslint-disable-next-line no-process-exit
    process.exit();
}

const json_file_repository = JsonFileRepository.getInstance();

(async () => {

    const followers_json = await json_file_repository.getData(
        path.join(param, 'followers_and_following', 'followers_1.json')
    );
    const follower_list = followers_json
        .map((item) => item.string_list_data[0].value);

    const followings_json = await json_file_repository.getData(
        path.join(param, 'followers_and_following', 'following.json')
    );
    const following_list = followings_json
        .relationships_following
        .map((item) => item.string_list_data[0].value);

    const following_not_follower_list = following_list
        .filter((following) => !follower_list.includes(following));

    console.log('following count', following_list.length);
    console.log('follower count', follower_list.length);
    console.log('following_not_follower_list', following_not_follower_list.length);

    console.log(following_not_follower_list);


})();
