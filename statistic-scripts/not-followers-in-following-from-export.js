'use strict';

const path = require('path');
const {
    logger,
} = require('../logger');
const {
    JsonFileRepository,
    FileRepository,
} = require('../repositories');
const {
    CommandLineParamsService,
} = require('../services/');

const {
    array_params,
} = (new CommandLineParamsService(logger)).setCommandLineParamsSchemaAndProcess({
    array_params: [
        {
            type: 'String',
            required: true,
            help: 'Instagram full dump folder path',
        },
        {
            type: 'String',
            required: false,
            help: 'File of followed accounts to except',
        },
    ],
});

const [
    instagram_export_path,
    following_exception_file,
] = array_params;

(async () => {
    const json_file_repository = JsonFileRepository.getInstance();

    let follower_list = [];
    try {
        const followers_json = await json_file_repository.getData(
            path.join(instagram_export_path, 'followers_and_following', 'followers_1.json')
        );
        follower_list = followers_json.map((item) => item.string_list_data[0].value);
    } catch (error) {
        logger.log(`Cannot load data from ${path.join(instagram_export_path, 'followers_and_following', 'followers_1.json')}`);
        // eslint-disable-next-line no-process-exit
        process.exit();
    }

    let following_list = [];
    try {
        const followings_json = await json_file_repository.getData(
            path.join(instagram_export_path, 'followers_and_following', 'following.json')
        );
        following_list = followings_json.relationships_following
            .map((item) => item.string_list_data[0].value);
    } catch (error) {
        logger.log(`Cannot load data from ${path.join(instagram_export_path, 'followers_and_following', 'following.json')}`);
        // eslint-disable-next-line no-process-exit
        process.exit();
    }

    const following_not_follower_list = following_list
        .filter((following) => !follower_list.includes(following));

    logger.log('following count', following_list.length);
    logger.log('follower count', follower_list.length);

    if (following_exception_file === undefined) {
        logger.log('following_not_follower_list', following_not_follower_list.length);
        logger.log(following_not_follower_list);
    } else {
        const file_repository = FileRepository.getInstance();
        const exception_file = await file_repository
            .readFileUtf8(following_exception_file);
        logger.log(exception_file);

        const exception_list = exception_file.split('\n');
        const excepted_list = following_not_follower_list.filter((following) => {
            return !exception_list.includes(following);
        });
        logger.log('following_not_follower_list', excepted_list.length);
        logger.log(excepted_list);
    }
})();
