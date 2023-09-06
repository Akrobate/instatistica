'use strict';

const {
    init_puppeteer_step,
    login_step,
} = require('../steps');

// Should use user configuration loader
const auth = require('../auth');

/**
 * @todo: Should test if user is already connected or not
 */
(async () => {
    init_puppeteer_step.headless = false;
    await init_puppeteer_step.process();
    const page = init_puppeteer_step.getPage();

    await page.goto('https://www.instagram.com/');

    try {
        await page.waitForSelector('svg[aria-label="Search"]');
    } catch (error) {
        console.log(error);
        await login_step.process(page, auth);
        page.goto('https://www.instagram.com/');
        await page.waitForSelector('svg[aria-label="Search"]');
    }
})();
