'use strict';

const {
    BookMarkService,
} = require('./BookMarkService');

class UsernameBookMarkService extends BookMarkService {

    /**
     * @retruns {TagBookMarkService}
     */
    constructor() {
        super();
        this.filename = 'username_to_process.json';
    }
}

UsernameBookMarkService.instance = null;
const username_book_mark_service = UsernameBookMarkService.buildInstance();

module.exports = {
    UsernameBookMarkService,
    username_book_mark_service,
};
