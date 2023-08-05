'use strict';

const {
    login_step,
    LoginStep,
} = require('./LoginStep');

const {
    navigate_to_tag_step,
    NavigateToTagStep,
} = require('./NavigateToTagStep');

const {
    navigate_to_profile_step,
    NavigateToProfileStep,
} = require('./NavigateToProfileStep');

const {
    NavigateToPostStep,
    navigate_to_post_step,
} = require('./NavigateToPostStep');

const {
    InitPuppeteerStep,
    init_puppeteer_step,
} = require('./InitPuppeteerStep');

const {
    NavigateToUrlStep,
    navigate_to_url_step,
} = require('./NavigateToUrlStep');

module.exports = {
    NavigateToTagStep,
    NavigateToProfileStep,
    LoginStep,
    NavigateToPostStep,
    InitPuppeteerStep,
    NavigateToUrlStep,
    login_step,
    navigate_to_tag_step,
    navigate_to_profile_step,
    navigate_to_post_step,
    init_puppeteer_step,
    navigate_to_url_step,
};
