/* eslint-disable no-undef */

'use strict';

const {
    AbstractStep,
} = require('./AbstractStep');

class NavigateToProfileStep extends AbstractStep {

    // eslint-disable-next-line require-jsdoc
    constructor() {
        super();
        this.screenshot_name_prefix = 'screenshot-navigate-to-profile';
        this.activate_screen_shots = true;

        this.post_list = [];
    }


    /**
     * @param {String} page
     * @param {String} username
     * @returns {void}
     */
    async process(page, username) {
        const formated_username = username.replace('@', '');
        await page.goto(`https://www.instagram.com/${formated_username}/`);
        await this.screenshot(page);
    }


    /**
     * @param {String} page
     * @returns {Array}
     */
    async processGetAllPostsList(page) {
        const total_post_count = await this.extractTotalPostCount(page);
        while (this.post_list.length < total_post_count) {
            const current_posts = await this.extractVisiblePostLinks(page);
            current_posts.forEach((post) => {
                if (!this.post_list.includes(post)) {
                    this.post_list.push(post);
                }
            });
            await this.scrollDown(page);
            await page.waitForTimeout(1000);
            await this.screenshot(page);
        }
        return this.post_list;
    }


    /**
     * @param {String} page
     * @returns {void}
     */
    async scrollDown(page) {
        await page.evaluate(() => {
            const total_height = document.body.scrollHeight;
            window.scroll(0, total_height);
        });
        return true;
    }


    /**
     * @param {String} page
     * @returns {Number}
     */
    async extractTotalPostCount(page) {
        const post_count = await page.evaluate(() => {
            return [...document.querySelectorAll('.g47SY')][0].innerText;
        });
        return Number(post_count);
    }


    /**
     * @param {String} page
     * @returns {Array}
     */
    async extractVisiblePostLinks(page) {
        const visible = await page.evaluate(() => {
            return [...document.querySelectorAll('._bz0w a')].map((el) => el.getAttribute('href'));
        });
        return visible;
    }
}

const navigate_to_profile_step = new NavigateToProfileStep();

module.exports = {
    NavigateToProfileStep,
    navigate_to_profile_step,
};
