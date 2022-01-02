'use strict';

const puppeteer = require('puppeteer');
const auth = require('./auth');

const {
    login_step,
    navigate_to_tag_step,
    navigate_to_profile_step,
    navigate_to_post_step,
} = require('./steps/');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await login_step.process(page, auth);

    // await navigate_to_tag_step.process(page, '#esp32');
    // const data = await navigate_to_tag_step.extractVisiblePostLinks(page);

    // await navigate_to_profile_step.process(page, 'artiominsta');
    // const data = await navigate_to_profile_step.extractVisiblePostLinks(page);
    // const data = await navigate_to_profile_step.processGetAllPostsList(page);

    // '/p/CXt1_RhrhpN/', '/p/B45GCjzohtk/', '/p/Bniz_cbgyGC/'
    await navigate_to_post_step.process(page, '/p/CXt1_RhrhpN/');
    const user_name = await navigate_to_post_step.extractUsername(page);
    console.log(user_name);

    // await navigate_to_post_step.process(page, '/p/B45GCjzohtk/');
    // await navigate_to_post_step.process(page, '/p/Bniz_cbgyGC/');

    // console.log(data);
    // console.log(data.length);
    await browser.close();
})();
