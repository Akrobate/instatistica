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
    }


    /**
     * @param {Object} page
     * @param {String} post_url
     * @returns {void}
     */
    async process() {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
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

}

const init_puppeteer_step = new InitPuppeteerStep();

module.exports = {
    InitPuppeteerStep,
    init_puppeteer_step,
};
