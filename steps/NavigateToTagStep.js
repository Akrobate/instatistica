'use strict';

const {
    AbstractStep,
} = require('./AbstractStep');

class NavigateToTagStep extends AbstractStep {

    constructor() {
        super();
        this.screenshot_name_prefix = 'screenshot-navigate-to-tag';
        this.activate_screen_shots = true;
    }


    async process(page, tag_name) {
        const formated_tag_name = tag_name.replace('#', '');
        await page.goto(`https://www.instagram.com/explore/tags/${formated_tag_name}/`);
        await this.screenshot(page, formated_tag_name); 
    }


    async extractVisiblePostLinks(page) {
        const results = await page.evaluate(() => {
            return [...document.querySelectorAll('._bz0w a')].map((el) => el.getAttribute('href'));
        })
        return results;
    }
}

const navigate_to_tag_step = new NavigateToTagStep();

module.exports = {
    NavigateToTagStep,
    navigate_to_tag_step,
};
