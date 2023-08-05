/* eslint-disable no-undef */

'use strict';

const {
    AbstractStep,
} = require('./AbstractStep');

class NavigateToUrlStep extends AbstractStep {

    // eslint-disable-next-line require-jsdoc
    constructor() {
        super();
        this.screenshot_name_prefix = 'screenshot-navigate-to-url';
        this.activate_screen_shots = true;
    }

    /**
     * @param {Object} page
     * @param {String} url
     * @returns {void}
     */
    async process(page, url) {
        await page.goto(url);
        const formated_url = url.replace(/\//g, '');

        await this.screenshot(page, formated_url);
    }

}

const navigate_to_url_step = new NavigateToUrlStep();

module.exports = {
    NavigateToUrlStep,
    navigate_to_url_step,
};
