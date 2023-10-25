'use strict';

const {
    logger,
} = require('../logger');
const {
    FileRepository,
} = require('../repositories');
const {
    CommandLineParamsService,
    StatisticScriptCommonsService: SSCS,
} = require('../services/');

const command_line_params_service = new CommandLineParamsService(logger);
command_line_params_service.setCommandLineParamsSchema({
    array_params: [
        {
            type: 'String',
            required: true,
            help: 'Posts file name',
        },
    ],
});

const [
    post_filename,
] = command_line_params_service.processSchema().array_params;

function tagsOrderedByMostAncientUsage(_post_list) {

    const post_tag_list = _post_list
        .map((item) => SSCS.extractHashtags(item));

    const uniq_tags_list = [];

    post_tag_list.forEach((_tag_list) => {
        _tag_list.forEach((_tag) => {
            if (!uniq_tags_list.includes(_tag)) {
                uniq_tags_list.push(_tag);
            }
        });
    });

    const tag_count = uniq_tags_list.map((_tag) => {
        let used_last_time = 0;
        for (let i = post_tag_list.length - 1; i > 1; i--) {
            if (post_tag_list[i].includes(_tag)) {
                used_last_time = post_tag_list.length - i - 1;
                break;
            }
        }
        return {
            name: _tag,
            used_last_time,
        };
    });

    tag_count.sort((a, b) => {
        if (a.used_last_time > b.used_last_time) {
            return 1;
        } else if (a.used_last_time < b.used_last_time) {
            return -1;
        }
        return 0;
    });

    return tag_count;
}


function printTagsCustom(list) {
    list.forEach((tag_object) => {
        logger.log(
            `last used: ${tag_object.used_last_time} \t ${tag_object.name}`
        );
    });
}


(async () => {

    const file_repository = FileRepository.getInstance();
    const data = await file_repository
        .readFileUtf8(post_filename);

    const post_list = data.split('*******************');

    const tags = {};

    post_list.forEach((item) => {
        const tags_list = SSCS.extractHashtags(item);
        tags_list.forEach((tag) => {
            if (tags[tag] === undefined) {
                tags[tag] = 1;
            } else {
                tags[tag]++;
            }
        });
    });

    const tag_list = [];

    for (const tag of Object.keys(tags)) {
        tag_list.push({
            name: tag,
            count: tags[tag],
        });
    }

    tag_list.sort((a, b) => {
        if (a.count > b.count) {
            return -1;
        } else if (a.count < b.count) {
            return 1;
        }
        return 0;
    });

    console.log(tag_list.map((item) => item.name).join(' '));
    console.log(tag_list);
    console.log(tag_list.length);

    // console.log(tagsOrderedByMostAncientUsage(post_list));

    printTagsCustom(
        tagsOrderedByMostAncientUsage(post_list)
    );
})();
