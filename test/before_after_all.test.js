'use strict';

const {
    stub,
} = require('sinon');

const MUTE_CONSOLE_LOGS = false;

const stubs = {};

before(() => {
    if (MUTE_CONSOLE_LOGS) {
        stubs.console_log = stub(console, 'log').callsFake(() => null);
    }
});

after(() => {
    Object.keys(stubs).forEach((stub_key) => {
        stubs[stub_key].restore();
    });
});

