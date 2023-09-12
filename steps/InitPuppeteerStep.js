/* eslint-disable no-undef */

'use strict';

// const puppeteer = require('puppeteer');

const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// eslint-disable-next-line new-cap
puppeteer.use(StealthPlugin());

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

        this.user_data_dir = null;

        this.viewport_width = 1920;
        this.viewport_height = 1080;
    }


    /**
     * @param {Object} page
     * @param {String} post_url
     * @returns {void}
     */
    async process() {

        let config = {
            headless: this.headless,
        };

        if (this.headless === false) {
            config = {
                ...config,
                args: [
                    '--start-maximized', // or '--start-fullscreen'
                ],
            };
        }

        if (this.user_data_dir !== null) {
            config = {
                ...config,
                userDataDir: this.user_data_dir,
            };
        }

        this.browser = await puppeteer.launch(config);
        this.page = await this.browser.newPage();

        await this.page.setViewport({
            width: this.viewport_width,
            height: this.viewport_height,
        });

        return this;
    }


    /**
     * @returns {Promise<void>}
     */
    async stop() {
        await this.page.close();
        await this.browser.close();
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
     * @param {String} user_data_dir
     * @return {void}
     */
    setUserDataDir(user_data_dir = './user_data') {
        this.user_data_dir = user_data_dir;
    }


    /**
     * @param {Number} width
     * @param {Number} height
     * @returns {void}
     */
    setViewportSize(width = 1920, height = 1080) {
        this.viewport_width = width;
        this.viewport_height = height;
    }


    /**
     * @param {Object} user_configuration
     * @returns {void}
     */
    setConfiguration(user_configuration) {
        const {
            browser,
        } = user_configuration;
        if (browser === null) {
            return;
        }

        const {
            browser_data,
            viewport_width,
            viewport_height,
        } = browser;

        if (browser_data) {
            this.setUserDataDir(browser_data);
        }

        if (viewport_width && viewport_height) {
            this.setViewportSize(viewport_width, viewport_height);
        }
    }
}

const init_puppeteer_step = new InitPuppeteerStep();

module.exports = {
    InitPuppeteerStep,
    init_puppeteer_step,
};
