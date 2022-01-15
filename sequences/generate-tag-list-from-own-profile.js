'use strict';

const {
    book_mark_service,
} = require('../services');


const {
    init_puppeteer_step,
    login_step,
    navigate_to_profile_step,
    navigate_to_post_step,
} = require('../steps');

const auth = require('../auth');

const user_to_get_tags_from = '';


(async () => {
    await init_puppeteer_step.process();
    const page = init_puppeteer_step.getPage();

    await login_step.process(page, auth);

    await navigate_to_profile_step.process(page, user_to_get_tags_from);
    const post_list = await navigate_to_profile_step.processGetAllPostsList();

    let tag_list = [];
    for (const post of post_list) {
        await navigate_to_post_step.process(page, post);
        const extracted_tag_list = await navigate_to_post_step.extractPostTags();
        tag_list = tag_list.concat(extracted_tag_list);
    }
    tag_list = [...new Set(tag_list)];

    await book_mark_service.saveAndDeduplicateTagsListToProcess(tag_list);

})();
