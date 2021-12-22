'use strict';

const puppeteer = require('puppeteer');
const auth = require('./auth');

const {
  login_step,
} = require('./steps/LoginStep');

const {
  navigate_to_tag_step,
} = require('./steps/NavigateToTagStep');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await login_step.process(page, auth);
    await navigate_to_tag_step.process(page, '#esp32');

    const data = await navigate_to_tag_step.extractVisiblePostLinks(page);

    console.log(data);
    await browser.close();
})();

