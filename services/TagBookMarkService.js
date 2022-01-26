'use strict';

const {
    BookMarkService,
} = require('./BookMarkService');

class TagBookMarkService extends BookMarkService {

    /**
     * @retruns {TagBookMarkService}
     */
    constructor() {
        super();
        this.filename = 'tags_to_process.json';
    }

}

TagBookMarkService.instance = null;
const tag_book_mark_service = TagBookMarkService.buildInstance();

module.exports = {
    TagBookMarkService,
    tag_book_mark_service,
};
