'use strict';

const path = require('path');
const {
    AbstractBookMarkService,
} = require('./AbstractBookMarkService');

const {
    JsonFileRepository,
} = require('../repositories');

const {
    configuration,
} = require('../configuration');

class UsernameBookMarkService extends AbstractBookMarkService {

    /**
     * @param {JsonFileRepository} json_file_repository
     * @retruns {UsernameBookMarkService}
     */
    constructor(json_file_repository) {
        super(json_file_repository);
        this.book_mark_filename = path.join(configuration.getDataFolder(), 'username_to_process.json');

    }

    /**
     * @static
     * @returns {BookMarkService}
     */
    static getInstance() {
        if (UsernameBookMarkService.instance) {
            return UsernameBookMarkService.instance;
        }
        UsernameBookMarkService.instance = new UsernameBookMarkService(
            JsonFileRepository.getInstance()
        );
        return UsernameBookMarkService.instance;
    }

}

UsernameBookMarkService.instance = null;
const tag_book_mark_service = UsernameBookMarkService.buildInstance();

module.exports = {
    UsernameBookMarkService,
    tag_book_mark_service,
};
