'use strict';

const {
    AbstractStep,
} = require('./AbstractStep');

class LoginStep extends AbstractStep {

    /**
     * Init
     */
    constructor() {
        super();
        this.screenshot_name_prefix = 'screenshot-login';
        this.activate_screen_shots = true;
    }

    /**
     * @param {String} page
     * @param {AuthObject} auth
     * @returns {Promise}
     */
    async process(page, auth) {

        await page.goto('https://www.instagram.com/');

        await this.screenshot(page);

        await page.waitForSelector('._a9_0');
        await this.screenshot(page);
        await page.click('._a9_0');

        await page.waitForSelector('.bIiDR', {
            hidden: true,
        });
        await this.screenshot(page);

        await page.type('input[name="username"]', auth.username);
        await page.type('input[name="password"]', auth.password);

        await this.screenshot(page);

        await page.waitForSelector('button[type="submit"]:not([disabled])');
        await this.screenshot(page);
        await page.waitForTimeout(1000);
        await page.click('button[type="submit"]');
        await this.screenshot(page);

        await this.screenshot(page);
        await page.waitForSelector('._aa56 > button[type="button"]');
        await page.click('._aa56 > button[type="button"]');

        await this.screenshot(page);
        await page.waitForTimeout(2000);
        await page.waitForSelector('.x7r02ix ._a9_1');
        await page.click('.x7r02ix ._a9_1');
        await page.waitForTimeout(2000);

        await this.screenshot(page);
    }


    /**
     * @param {Object} page
     * @returns {Boolean}
     */
    async checkIsLogged(page) {
        await page.goto('https://www.instagram.com/');
        let result = false;
        try {
            await page.waitForSelector('svg[aria-label="Search"]');
            result = true;
        } catch (error) {
            console.log(error);
        }
        return result;
    }

}

const login_step = new LoginStep();

module.exports = {
    LoginStep,
    login_step,
};
