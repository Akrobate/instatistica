'use strict';

const {
    init_puppeteer_step,
    login_step,
} = require('../steps');

const auth = require('../auth');


(async () => {
    await init_puppeteer_step.process();
    const page = init_puppeteer_step.getPage();

    await login_step.process(page, auth);

})();
