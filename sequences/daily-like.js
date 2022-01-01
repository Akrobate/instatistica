'use strict';

const {
    init_puppeteer_step,
    login_step,
    navigate_to_tag_step,
} = require('../steps');

const auth = require('../auth');


(async () => {
    await init_puppeteer_step.process();
    const page = init_puppeteer_step.getPage();

    await login_step.process(page, auth);

    // get tags list to like
    const tag_list = [];

    for (const tag of tag_list) {

        await navigate_to_tag_step.process(page, tag);
        const recent_post_result = await navigate_to_tag_step.extractVisiblePostLinks();
        const {
            recent,
        } = recent_post_result;


    }

})();
