'use strict';

class AbstractStep {

    // eslint-disable-next-line require-jsdoc
    constructor() {
        this.initDefault();
    }


    /**
     * @returns {void}
     */
    initDefault() {
        this.screenshot_name_prefix = 'untitled';
        this.activate_screen_shots = false;
        this.screenshot_path = './screenshots/';
        this.screenshot_number = 0;
    }


    /**
     * @returns {void}
     */
    reset() {
        this.initDefault();
    }


    /**
     * @returns {String}
     */
    getScreenshotNamePrefix() {
        return this.screenshot_name_prefix;
    }


    /**
     * @param {Object} page
     * @param {String} sub_step_name
     * @returns {coid}
     */
    async screenshot(page, sub_step_name) {
        if (this.activate_screen_shots) {
            this.screenshot_number++;
            await page.screenshot({
                path: `${
                    this.screenshot_path
                }${
                    this.screenshot_name_prefix
                }-${
                    this.screenshot_number
                }${
                    sub_step_name ? `-${sub_step_name}` : ''
                }.png`,
            });
        }
    }


    /**
     * @throws {Error}
     * @returns {void}
     */
    process() {
        throw new Error('Process should be overwritten');
    }


    /**
     * @param {*} min
     * @param {*} max
     * @returns {Number}
     */
    randomInteger(min, max) {
        return min + Math.ceil(Math.random() * (max - min));
    }
}

module.exports = {
    AbstractStep,
};
