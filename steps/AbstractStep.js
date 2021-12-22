'use strict';

class AbstractStep {

    constructor() {
        this.screenshot_name_prefix = 'untitled';
        this.activate_screen_shots = false;
        this.screenshot_path = './screenshots/';
        this.screenshot_number = 0;
    }


    getScreenshotNamePrefix() {
        return this.screenshot_name_prefix;
    }


    async screenshot(page, sub_step_name) {
        this.screenshot_number++;
        await page.screenshot({
            path: `${
                    this.screenshot_path
                }${
                    this.screenshot_name_prefix
                }-${
                    this.screenshot_number
                }${ 
                    sub_step_name ? '-' + sub_step_name : ''
                }.png`
        });
    }


    async process() {
        throw new Error('Process should be overwritten')
    }
}

module.exports = {
    AbstractStep,
};
