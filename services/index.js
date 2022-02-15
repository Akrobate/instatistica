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

module.exports = {
    AbstractBookMarkService,
    book_mark_service,
    TagBookMarkService,
    tag_book_mark_service,
    UsernameBookMarkService,
    username_book_mark_service,
};
