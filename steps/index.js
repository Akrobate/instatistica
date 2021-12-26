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

module.exports = {
    NavigateToTagStep,
    NavigateToProfileStep,
    LoginStep,
    NavigateToPostStep,
    login_step,
    navigate_to_tag_step,
    navigate_to_profile_step,
    navigate_to_post_step,
};
