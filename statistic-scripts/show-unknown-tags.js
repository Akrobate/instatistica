'use strict';

const {
    logger,
} = require('../logger');
const {
    CommandLineParamsService: CLPS,
    StatisticScriptCommonsService: SSCS,
} = require('../services/');

const [
    string_to_evaluate,
    all_posts_file,
    never_used_file,
] = (new CLPS(logger)).setCommandLineParamsSchemaAndProcess({
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

    logger.log('\nAll tags known count: ', uniq_tag_list.length);

    const never_used_tag_list = await SSCS.extractUniqHashtagsFromFile(never_used_file);

    logger.log('Never used count: ', never_used_tag_list.length);
    const to_evaluate = SSCS.extractUniqHashtagsFromString(string_to_evaluate);

    logger.log('To evaluate count: ', to_evaluate.length);

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

    logger.log('\n====== UNKNOWN TAGS =======');
    SSCS.printTagList(unknown_tag_list);
})();
