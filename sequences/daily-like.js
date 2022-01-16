'use strict';

const {
    book_mark_service,
} = require('../services');


const {
    init_puppeteer_step,
    login_step,
    navigate_to_tag_step,
    navigate_to_post_step,
    navigate_to_profile_step,
} = require('../steps');

const auth = require('../auth');


(async () => {
    await init_puppeteer_step.process();
    const page = init_puppeteer_step.getPage();

    await login_step.process(page, auth);

    const tag_list = await book_mark_service.getTagsToProcess();

    for (const tag of tag_list) {
        await navigate_to_tag_step.process(page, tag);
        const recent_post_result = await navigate_to_tag_step.extractVisiblePostLinks();
        const {
            recent,
        } = recent_post_result;

        // Get all users that posted recently on wanted tag
        const username_list = [];
        for (const post of recent) {
            await navigate_to_post_step.process(page, post);
            const username = navigate_to_post_step.extractUsername();
            username_list.push(username);
        }

        // Go to like each lastest user post
        for (const usename of username_list) {
            navigate_to_profile_step.process(page, usename);

            // get last posts

            // like if not liked last post
        }
    }

})();
