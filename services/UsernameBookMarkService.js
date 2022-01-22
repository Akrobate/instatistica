'use strict';

const {
    BookMarkService,
} = require('./');

class UsernameBookMarkService extends BookMarkService {}

UsernameBookMarkService.instance = null;
const username_book_mark_service = UsernameBookMarkService.buildInstance();

module.exports = {
    UsernameBookMarkService,
    username_book_mark_service,
};
