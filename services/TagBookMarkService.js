'use strict';

const {
    BookMarkService,
} = require('./');

class TagBookMarkService extends BookMarkService {}

TagBookMarkService.instance = null;
const tag_book_mark_service = TagBookMarkService.buildInstance();

module.exports = {
    TagBookMarkService,
    tag_book_mark_service,
};
