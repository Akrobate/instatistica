'use strict';

const {
    configuration,
} = require('../../configuration');

const {
    ConfigurationLoaderService,
} = require('../../services');

const {
    JsonFileRepository,
    FileRepository,
} = require('../../repositories');

const path = require('path');

const {
    stub,
} = require('sinon');

const {
    expect,
} = require('chai');

const json_file_repository = new JsonFileRepository();
const file_repository = new FileRepository();
const configuration_loader_service = new ConfigurationLoaderService(
    json_file_repository, file_repository);

const stubs = {};

describe('ConfigurationLoaderService functional test', () => {

    beforeEach(() => {
        stubs.getDataFolder = stub(configuration, 'getDataFolder')
            .callsFake(() => path.join(__dirname, '..', 'data_working_folder'));
        return null;
    });

    afterEach(() => {
        stubs.getDataFolder.restore();
    });

    it('Loading user_1 configuration', async () => {
        const user_configuration = await configuration_loader_service.loadConfiguration('user_1');
        console.log(user_configuration);
        expect(user_configuration).to.be.an('Object');
    });

});
