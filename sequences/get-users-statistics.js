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
    command_line_params_service,
} = require('../services/CommandLineParamsService');


(async () => {

    const connected_user = command_line_params_service.getParam('connected_user', true);
    const username = command_line_params_service.getParam('username', true);


    // Init pupetter with user folder

    // process login

    // Iterate over usernames

    // extract datas

})();

