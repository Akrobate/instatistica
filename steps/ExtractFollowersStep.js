/* eslint-disable no-undef */

'use strict';

const {
    JsonFileRepository,
} = require('../repositories');

const {
    AbstractStep,
} = require('./AbstractStep');

class ExtractFollowersStep extends AbstractStep {


    // eslint-disable-next-line require-jsdoc
    constructor() {
        super();
        this.screenshot_name_prefix = 'screenshot-extract-followers';
        this.activate_screen_shots = false;
        this.json_file_repository = JsonFileRepository.getInstance()
    }


    /**
     * @param {String} page
     * @param {String} instagram_username
     * @returns {void}
     */
    async process(page, instagram_username) {

        await page.waitForSelector(`a[href="/${instagram_username}/followers/"]`);
        await page.click(`a[href="/${instagram_username}/followers/"]`);

        const scrollable_section_selector = '._aano';
        const item_selector = '.x1dm5mii';

        await page.waitForSelector(scrollable_section_selector);
        await page.waitForTimeout(2000);

        let result_count = 0;
        let previous_count = 0;
        let iteration = 0;

        while (result_count > previous_count || iteration === 0) {

            iteration++;
            previous_count = result_count;
            await page.evaluate((selector, iteration) => {
                const scrollableSection = document.querySelector(selector);
                scrollableSection.scrollTop = 1000 * (iteration + 1);
            }, scrollable_section_selector, iteration);

            await page.waitForNetworkIdle({ idleTime: 250 }),

            await page.waitForTimeout(this.randomInteger(1000,1500));
            
            result_count = await page.evaluate((item_selector) => {
                return Promise.resolve(document.querySelectorAll(item_selector).length)
            }, item_selector)

            const data = await page.evaluate((item_selector) => {
                const list = [...document.querySelectorAll(item_selector)].map((sub_element) => {
                    return {
                        instagram_username: sub_element.querySelectorAll('span')[0].innerText,
                        name: sub_element.querySelectorAll('span')[1].innerText,
                    }
                })

                return Promise.resolve(list)
            }, item_selector)

            this.json_file_repository.setFileName(`${instagram_username}-followers.json`);
            await this.json_file_repository.saveData(data);

            console.log(`result_count: ${result_count} - iteration: ${iteration}`)
        }

    }


}

const extract_followers_step = new ExtractFollowersStep();

module.exports = {
    ExtractFollowersStep,
    extract_followers_step,
};

