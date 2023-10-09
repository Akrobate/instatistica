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

class TagBookMarkService extends AbstractBookMarkService {

    /**
     * @param {JsonFileRepository} json_file_repository
     * @retruns {TagBookMarkService}
     */
    constructor(json_file_repository) {
        super(json_file_repository);
        this.book_mark_filename = path.join(configuration.getDataFolder(), 'tags_to_process.json');
    }

    /**
     * @static
     * @returns {BookMarkService}
     */
    static getInstance() {
        if (TagBookMarkService.instance) {
            return TagBookMarkService.instance;
        }
        TagBookMarkService.instance = new TagBookMarkService(
            JsonFileRepository.getInstance()
        );
        return TagBookMarkService.instance;
    }

}

TagBookMarkService.instance = null;
const tag_book_mark_service = TagBookMarkService.buildInstance();

module.exports = {
    TagBookMarkService,
    tag_book_mark_service,
};
