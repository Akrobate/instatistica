'use strict';

const {
    init_puppeteer_step,
    navigate_to_url_step,
} = require('../steps');

// const headless_detector_url = 'https://infosimples.github.io/detect-headless/';
const headless_detector_url = 'https://bot.sannysoft.com/';

(async () => {
    init_puppeteer_step.headless = false;
    await init_puppeteer_step.process();
    const page = init_puppeteer_step.getPage();

    await navigate_to_url_step.process(page, headless_detector_url);

    await page.waitForTimeout(1000);

    await navigate_to_url_step.screenshot(page, 'detects');

    await page.close();

    const browser = init_puppeteer_step.getBrowser();
    await browser.close();

})();
