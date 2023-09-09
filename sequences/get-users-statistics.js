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

    const y = command_line_params_service.getParam('y', true);
    console.log(y);

    // Init pupetter with user folder

    // process login

    // Iterate over usernames

    // extract datas

})();

