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

(async () => {

    const file_repository = FileRepository.getInstance();

    const all_posts_string = await file_repository.readFileUtf8(all_posts_file);
    const uniq_tag_list = SSCS.extractUniqHashtagsFromString(all_posts_string);

    logger.log('uniq_tag_list count', uniq_tag_list.length);
    logger.log(uniq_tag_list);

    const never_used_string = await file_repository.readFileUtf8(never_used_file);
    const never_used_tag_list = SSCS.extractUniqHashtagsFromString(never_used_string);
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
