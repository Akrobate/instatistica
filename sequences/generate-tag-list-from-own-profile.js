'use strict';

const {
    book_mark_service,
} = require('../services');


const {
    init_puppeteer_step,
    login_step,
    navigate_to_tag_step,
} = require('../steps');

const auth = require('../auth');

const user_to_get_tags_from = '';


(async () => {
    await init_puppeteer_step.process();
    const page = init_puppeteer_step.getPage();

    await login_step.process(page, auth);

    // get tags list to like
    const tag_list = [];

    // Go to own profile

    // Extract tags of each user post

    // Save and deduplicate tags
    await book_mark_service.saveAndDeduplicateTagsListToProcess(tag_list);

})();
