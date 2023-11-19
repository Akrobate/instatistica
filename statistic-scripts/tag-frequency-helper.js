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
    thematical_file_to_exclude,
    tags_ideas_file,
} = (new CLPS(logger)).setCommandLineParamsSchemaAndProcess({
    params: {
        'sort': {
            type: 'String',
            required: false,
            help: 'sort by "count" or "used_last_time" (default)',
            default: 'used_last_time',
        },
        'thematical_file_to_exclude': {
            type: 'String',
            required: false,
            help: 'thematical file to exclude them for display',
            default: null,
        },
        'tags_ideas_file': {
            type: 'String',
            required: false,
            help: 'Ideas tags file name (for preview and update)',
            default: null,
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
    array_param_tags_ideas_filename,
] = array_params;


// eslint-disable-next-line no-nested-ternary
const tags_ideas_filename = array_param_tags_ideas_filename
    ? array_param_tags_ideas_filename
    : tags_ideas_file
        ? tags_ideas_file
        : undefined;


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
        `last: ${tag.used_last_time} \t cnt: \x1b[33m${tag.count}\x1b[0m \t ${tag.name}`
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

    let tag_list = uniq_tags.map((tag) => ({
        name: tag,
        count: tags_total_count[tag],
        used_last_time: tags_last_time[tag],
    }));

    let thematical_tags_list_display = [];
    if (thematical_file_to_exclude) {
        logger.log('');
        const tags_thematical_list = (
            await file_repository.readFileUtf8(thematical_file_to_exclude)
        )
            .split('\n');

        thematical_tags_list_display = tag_list
            .filter((_tag) => tags_thematical_list.includes(_tag.name));
        tag_list = tag_list.filter((_tag) => !tags_thematical_list.includes(_tag.name));
    }

    logger.log(`Total tags count: ${tag_list.length}`);
    printTagsCustom(SSCS.sortArrayObj(tag_list, sort === 'count' ? 'count' : 'used_last_time', true));

    if (thematical_file_to_exclude) {
        logger.log('');
        logger.log(`Total thematical tags count: ${thematical_tags_list_display.length}`);
        printTagsCustom(SSCS.sortArrayObj(thematical_tags_list_display, sort === 'count' ? 'count' : 'used_last_time', true));
    }

    if (tags_ideas_filename) {
        logger.log('');
        const tags_ideas_list = (await file_repository.readFileUtf8(tags_ideas_filename))
            .split('\n');

        const tags_ideas_tags = tags_ideas_list.filter((_tag) => !uniq_tags.includes(_tag));
        logger.log(`Ideas tags (file: ${tags_ideas_filename})`);
        logger.log(tags_ideas_tags.join(' '));

        const duplicated_tags = tags_ideas_list.filter((_tag) => uniq_tags.includes(_tag));

        if (duplicated_tags.length > 0) {
            logger.log('\nTo remove from idea tags');
            logger.log(duplicated_tags.join(' '));
        }
    }

})();
