'use strict';

const {
    logger,
} = require('../logger');
const {
    FileRepository,
} = require('../repositories');
const {
    CommandLineParamsService,
} = require('../services/');

const command_line_params_service = new CommandLineParamsService(logger);
command_line_params_service.setCommandLineParamsSchema({
    array_params: [
        {
            type: 'String',
            required: true,
            help: 'Tags list to evaluate like : "#one #two"',
        },
        {
            type: 'String',
            required: true,
            help: 'All posts file',
        },
        {
            type: 'String',
            required: false,
            help: 'Never used tags file (tags has to be wroten #something)',
        },
    ],
});

const [
    string_to_evaluate,
    all_posts_file,
    never_used_file,
] = command_line_params_service.processSchema().array_params;

function extractHashtags(str) {
    const regexp = /(#\S+)/g;
    return [...str.matchAll(regexp)].map((item) => item[0]);
}

function printTagList(tag_list) {
    tag_list.forEach((tag) => {
        logger.log(`#${tag.replace('#', '')}`);
    });
}

(async () => {

    const file_repository = FileRepository.getInstance();
    const all_posts_string = await file_repository
        .readFileUtf8(all_posts_file);

    const uniq_tag_list = [...new Set(extractHashtags(all_posts_string))]
        .map((tag) => tag.replace('#', ''));
    console.log('uniq_tag_list count', uniq_tag_list.length);
    console.log(uniq_tag_list);

    const never_used_string = await file_repository
        .readFileUtf8(never_used_file);
    const never_used_tag_list = [...new Set(extractHashtags(never_used_string))]
        .map((tag) => tag.replace('#', ''));
    console.log(never_used_tag_list);


    const to_evaluate = [...new Set(extractHashtags(string_to_evaluate))]
        .map((tag) => tag.replace('#', ''));
    console.log(to_evaluate);

    const unknown_tag_list = [];

    to_evaluate.forEach((tag) => {
        if (
            ![
                ...never_used_tag_list,
                ...uniq_tag_list,
            ].includes(tag)
        ) {
            unknown_tag_list.push(tag);
        }
    });

    printTagList(unknown_tag_list);


})();

