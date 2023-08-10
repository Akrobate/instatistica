/* eslint-disable no-undef */

'use strict';

//const puppeteer = require('puppeteer');

const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const {
    AbstractStep,
} = require('./AbstractStep');

class InitPuppeteerStep extends AbstractStep {

    // eslint-disable-next-line require-jsdoc
    constructor() {
        super();
        this.screenshot_name_prefix = 'screenshot-init-puppeteer';
        this.activate_screen_shots = true;
        this.browser = null;
        this.page = null;
        this.headless = true;
    }


    /**
     * @param {Object} page
     * @param {String} post_url
     * @returns {void}
     */
    async process() {
        this.browser = await puppeteer.launch({
            headless: this.headless,
            userDataDir: "./user_data",
            args:[
                '--start-maximized' // or '--start-fullscreen'
            ]
        });

        this.page = await this.browser.newPage();

        await this.page.setViewport({
            width: 1920,
            height: 1080,
        });

        return this;
    }


    /**
     * @returns {Object}
     */
    getPage() {
        return this.page;
    }


    /**
     * @returns {Object}
     */
    getBrowser() {
        return this.browser;
    }


    /**
     * @returns {Promise<void>}
     */
    async stop() {
        await this.page.close();
        await this.browser.close();
    }
    
}

const init_puppeteer_step = new InitPuppeteerStep();

module.exports = {
    InitPuppeteerStep,
    init_puppeteer_step,
};
