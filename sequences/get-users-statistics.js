/**
 * Script to provide statistics of a list of users
 * you need to provide a list of instagram usernames
 * this script will return for each provided username
 *  - posts_count
 *  - followings_count
 *  - followers_count
 */

'use strict';

const {
    CommandLineParamsService,
} = require('../services/CommandLineParamsService');

const command_line_params_service = new CommandLineParamsService();
command_line_params_service.setCommandLineParamsSchema(
    {
        params: {
            'param_name': {
                type: 'Number',
                required: true,
                help: 'Some explanation text',
            },
        },
        array_params: [
            {
                type: 'Number',
                required: true,
                help: 'Some explanation text',
            },
        ],
    }
);

(async () => {

    command_line_params_service.checkIfDisplayHelp();
    const connected_user = command_line_params_service.getParam('connected_user', true);
    const username = command_line_params_service.getParam('username', true);


    // Init pupetter with user folder

    // process login

    // Iterate over usernames

    // extract datas

})();

