'use strict'

const {
    AbstractStep,
} = require('./AbstractStep');

class LoginStep extends AbstractStep {

    constructor() {
        super();
        this.screenshot_name_prefix = 'screenshot-login';
        this.activate_screen_shots = true;
    }

    async process(page, auth) {

        await page.goto('https://www.instagram.com/');

        await this.screenshot(page);
        await page.waitForSelector('.bIiDR');

        await this.screenshot(page);
        await page.click('.bIiDR');
      
        await page.waitForSelector('.bIiDR', { hidden: true })
        await this.screenshot(page);
      
        await page.type('input[name="username"]', auth.username);
        await page.type('input[name="password"]', auth.password);
      
        await this.screenshot(page);

        await page.waitForSelector('button[type="submit"]:not([disabled])')
        await this.screenshot(page);        
        await page.click('button[type="submit"]');
        await this.screenshot(page);


        await page.waitForTimeout(7000);
        await this.screenshot(page);

        await page.waitForSelector('.ABCxa');
        await this.screenshot(page);
        await page.click('.cmbtv > button[type="button"]');
        
        await this.screenshot(page);
        await page.waitForTimeout(2000);

        await this.screenshot(page);        
    }

}

const login_step = new LoginStep();

module.exports = {
    LoginStep,
    login_step,
};
