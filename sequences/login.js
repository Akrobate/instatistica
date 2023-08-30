'use strict';

const {
    init_puppeteer_step,
    login_step,
    extract_followers_step,
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

    // await login_step.process(page, auth);

    await page.goto('https://www.instagram.com/');

    try {
        await page.waitForSelector('svg[aria-label="Search"]');
    } catch (error) {
        console.log(error);
        await login_step.process(page, auth);
        page.goto('https://www.instagram.com/');
        await page.waitForSelector('svg[aria-label="Search"]');
    }

    await page.click('svg[aria-label="Search"]');

    // const instagram_name = 'jorleinascimento01';
    const instagram_name = 'ailab_oneart';

    await page.waitForSelector('input[aria-label="Search input"]');
    await page.type('input[aria-label="Search input"]', instagram_name);
    // await page.keyboard.press('Enter');

    await page.waitForSelector(`a[href="/${instagram_name}/"]`);
    await page.click(`a[href="/${instagram_name}/"]`);

    // await page.waitForTimeout(200000);

    // await page.waitForSelector('a[href="/"]');
    // await page.click('a[href="/"]');

    await extract_followers_step.process(page, instagram_name);

})();
