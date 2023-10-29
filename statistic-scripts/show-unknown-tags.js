'use strict';

const {
    logger,
} = require('../logger');
const {
    CommandLineParamsService,
    StatisticScriptCommonsService: SSCS,
} = require('../services/');

const command_line_params_service = new CommandLineParamsService(logger);
const [
    string_to_evaluate,
    all_posts_file,
    never_used_file,
] = command_line_params_service.setCommandLineParamsSchemaAndProcess({
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
}).array_params;

(async () => {

    const uniq_tag_list = await SSCS.extractUniqHashtagsFromFile(all_posts_file);

    logger.log('uniq_tag_list count', uniq_tag_list.length);
    logger.log(uniq_tag_list);

    const never_used_tag_list = SSCS.extractUniqHashtagsFromString(never_used_file);
    logger.log(never_used_tag_list);

    const to_evaluate = SSCS.extractUniqHashtagsFromString(string_to_evaluate);
    logger.log(to_evaluate);

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

    SSCS.printTagList(unknown_tag_list);
})();
