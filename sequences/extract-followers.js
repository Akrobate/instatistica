/**
 * This script will extract all followers from an instragram_username
 * the output will be stored in ./data/
 * the output file is named with pattern `${instagram_username}-followers.json`
 * the format of the stored file is :
 * [
 *   {
 *      instagram_username: 'CONTAINS THE USER NAME INSTAGRAM'
 *      name: 'Optionnal information setted by the user'
 *   }
 * ]
 */

'use strict';

const {
    init_puppeteer_step,
    login_step,
    navigate_to_profile_step,
    navigate_to_post_step,
    extract_followers_step,
} = require('../steps');

const auth = require('../auth');

const instagram_name = 'ailab_oneart';

(async () => {

    init_puppeteer_step.headless = false;
    await init_puppeteer_step.process();
    const page = init_puppeteer_step.getPage();

    //await login_step.process(page, auth);

    await page.goto('https://www.instagram.com/');
    await page.waitForSelector('svg[aria-label="Search"]');
    await page.click('svg[aria-label="Search"]');
    
    await page.waitForSelector('input[aria-label="Search input"]');
    await page.type('input[aria-label="Search input"]', instagram_name);

    await page.waitForSelector(`a[href="/${instagram_name}/"]`);
    await page.click(`a[href="/${instagram_name}/"]`);
    
    // await page.waitForTimeout(200000);
    // await page.waitForSelector('a[href="/"]');
    // await page.click('a[href="/"]');
    
    await extract_followers_step.process(page, instagram_name);

    await init_puppeteer_step.stop();


})();
