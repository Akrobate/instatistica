'use strict';

const {
    AbstractStep,
} = require('./AbstractStep');

class NavigateToPostStep extends AbstractStep {

    constructor() {
        super();
        this.screenshot_name_prefix = 'screenshot-navigate-to-tag';
        this.activate_screen_shots = true;
    }


    async process(page, post_url) {
        await page.goto(`https://www.instagram.com${post_url}`);
        const formated_post_url = post_url.replace(/\//g, '');
        await this.screenshot(page, formated_post_url); 
    }

}

const navigate_to_post_step = new NavigateToPostStep();

module.exports = {
    NavigateToPostStep,
    navigate_to_post_step,
};
