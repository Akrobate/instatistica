'use strict';

const {
    logger,
} = require('../logger');
const {
    FileRepository,
} = require('../repositories');
const {
    CommandLineParamsService: CLPS,
    StatisticScriptCommonsService: SSCS,
} = require('../services/');

const {
    array_params,
    sort,
} = (new CLPS(logger)).setCommandLineParamsSchemaAndProcess({
    params: {
        'sort': {
            type: 'String',
            required: false,
            help: 'sort by "count" or "used_last_time" (default)',
            default: 'used_last_time',
        },
    },
    array_params: [
        {
            type: 'String',
            required: true,
            help: 'Posts file name',
        },
        {
            type: 'String',
            required: false,
            help: 'Ideas tags file name (for preview and update)',
        },
    ],
});

const [
    post_filename,
    tags_ideas_filename,
] = array_params;

function tagsLastUsage(post_tag_list) {
    const uniq_tags_list = [...new Set(post_tag_list.flat())];
    const tags = {};
    uniq_tags_list.forEach((_tag) => {
        let used_last_time = 0;
        for (let i = post_tag_list.length - 1; i > 1; i--) {
            if (post_tag_list[i].includes(_tag)) {
                used_last_time = post_tag_list.length - i - 1;
                break;
            }
        }
        tags[_tag] = used_last_time;
    });
    return tags;
}


function tagsTotalUsedCount(post_tag_list) {
    const tags = {};
    post_tag_list.flat().forEach((tag) => {
        if (tags[tag]) {
            tags[tag]++;
        } else {
            tags[tag] = 1;
        }
    });
    return tags;
}


function printTagsCustom(list) {
    list.forEach((tag) => logger.log(
        `last: ${tag.used_last_time} \t cnt: ${tag.count} \t ${tag.name}`
    ));
}


(async () => {
    const file_repository = FileRepository.getInstance();
    const data = await file_repository.readFileUtf8(post_filename);

    const post_tag_list = data
        .split('*******************')
        .map((item) => SSCS.extractHashtags(item));
    const uniq_tags = await SSCS.extractUniqHashtagsFromString(data);
    const tags_total_count = tagsTotalUsedCount(post_tag_list);
    const tags_last_time = tagsLastUsage(post_tag_list);

    const tag_list = uniq_tags.map((tag) => ({
        name: tag,
        count: tags_total_count[tag],
        used_last_time: tags_last_time[tag],
    }));

    logger.log(`Total tags count: ${tag_list.length}`);
    printTagsCustom(SSCS.sortArrayObj(tag_list, sort === 'count' ? 'count' : 'used_last_time', true));


    if (tags_ideas_filename) {
        logger.log('Work in progress.');
        const tags_ideas_data = await file_repository.readFileUtf8(tags_ideas_filename);
        const tags_ideas_tags = tags_ideas_data
            .split('\n');
        logger.log('Ideas tags:');
        logger.log(tags_ideas_tags.join(' '));
        // Compare with already used tags
        // Display not used tags from file
        // update tags idea file (optional?)
    }
})();
