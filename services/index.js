'use strict';

const {
    AbstractBookMarkService,
    book_mark_service,
} = require('./AbstractBookMarkService');
const {
    TagBookMarkService,
    tag_book_mark_service,
} = require('./TagBookMarkService');
const {
    UsernameBookMarkService,
    username_book_mark_service,
} = require('./UsernameBookMarkService');
const {
    ConfigurationLoaderService,
    configuration_loader_service,
} = require('./ConfigurationLoaderService');
const {
    CommandLineParamsService,
    command_line_params_service,
} = require('./CommandLineParamsService');
const {
    StatisticScriptCommonsService,
} = require('./StatisticScriptCommonsService');

module.exports = {
    AbstractBookMarkService,
    book_mark_service,
    TagBookMarkService,
    tag_book_mark_service,
    UsernameBookMarkService,
    username_book_mark_service,
    ConfigurationLoaderService,
    configuration_loader_service,
    CommandLineParamsService,
    command_line_params_service,
    StatisticScriptCommonsService,
};
