'use strict';

const {
    configuration,
} = require('../../configuration');

const {
    expect,
} = require('chai');

const {
    stub,
} = require('sinon');

const path = require('path');

describe('Configuration Unmocked', () => {
    it('getDataFolder', () => {
        const data_folder = configuration.getDataFolder();
        const splitted_data_folder = data_folder.split('/');
        expect(splitted_data_folder.slice(-2)).to.deep.equal([
            'instatistica',
            'data',
        ]);
    });
});


describe('Configuration mocked', () => {

    const stubs = {};

    beforeEach(() => {
        stubs.getDataFolder = stub(configuration, 'getDataFolder')
            .callsFake(() => path.join(__dirname, '..', 'data_working_folder'));
        return null;
    });

    afterEach(() => {
        stubs.getDataFolder.restore();
    });


    it('getDataFolder', (done) => {
        const data_folder = configuration.getDataFolder();
        expect(data_folder.split('/').slice(-2)).to.deep.equal([
            'test',
            'data_working_folder',
        ]);
        done();
    });

});
