'use strict';

const {
    BookMarkService,
    book_mark_service,
} = require('./BookMarkService');

const {
    TagBookMarkService,
    tag_book_mark_service,
} = require('./TagBookMarkService');

const {
    UsernameBookMarkService,
    username_book_mark_service,
} = require('./UsernameBookMarkService');

module.exports = {
    BookMarkService,
    book_mark_service,
    TagBookMarkService,
    tag_book_mark_service,
    UsernameBookMarkService,
    username_book_mark_service,
};
