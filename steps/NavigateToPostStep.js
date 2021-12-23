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


    async checkIsLiked(page) {
        const aria_label = await page.evaluate(() => {
            return document.querySelector('.fr66n svg').getAttribute('aria-label');
        });
        return aria_label == 'Unlike' ? true : false;
    }


    async clickLikeButton(page) {
        const result = await page.evaluate(() => {
            return document.querySelector('.fr66n svg').parentNode.parentNode.click();
        });
        return result;
    }

}

const navigate_to_post_step = new NavigateToPostStep();

module.exports = {
    NavigateToPostStep,
    navigate_to_post_step,
};





// document.querySelector('.fr66n svg').parentNode.parentNode.click()
// document.querySelector('.fr66n svg').getAttribute('aria-label')