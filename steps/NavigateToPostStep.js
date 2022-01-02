/* eslint-disable no-undef */

'use strict';

const {
    AbstractStep,
} = require('./AbstractStep');

class NavigateToPostStep extends AbstractStep {

    // eslint-disable-next-line require-jsdoc
    constructor() {
        super();
        this.screenshot_name_prefix = 'screenshot-navigate-to-tag';
        this.activate_screen_shots = true;
    }


    /**
     * @param {Object} page
     * @param {String} post_url
     * @returns {void}
     */
    async process(page, post_url) {
        await page.goto(`https://www.instagram.com${post_url}`);
        const formated_post_url = post_url.replace(/\//g, '');
        await this.screenshot(page, formated_post_url);
    }


    /**
     * @param {Object} page
     * @returns {Boolean}
     */
    async checkIsLiked(page) {
        const aria_label = await page.evaluate(() => {
            return document.querySelector('.fr66n svg').getAttribute('aria-label');
        });
        return aria_label === 'Unlike';
    }


    /**
     * @param {Object} page
     * @returns {void}
     */
    async clickLikeButton(page) {
        const result = await page.evaluate(() => {
            return document.querySelector('.fr66n svg').parentNode.parentNode.click();
        });
        return result;
    }


    /**
     * @param {Object} page
     * @returns {Array}
     */
    async extractPostTags(page) {
        const result = await page.evaluate(() => {
            return [
                ...document.querySelectorAll('.P9YgZ')[0].querySelectorAll('.xil3i'),
            ].map((element) => element.innerText);
        });
        const formatted_tag_list = result.map((raw_tag) => raw_tag.replace('#', '').toLowerCase());
        return formatted_tag_list;
    }


    /**
     * @todo
     * @param {Object} page
     * @returns {String}
     */
    async extractUsername(page) {
        const result = await page.evaluate(() => {
            return document.querySelector('.e1e1d a').innerText;
        });
        return result;
    }

}

const navigate_to_post_step = new NavigateToPostStep();

module.exports = {
    NavigateToPostStep,
    navigate_to_post_step,
};
