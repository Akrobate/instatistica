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
        expect(user_configuration).to.be.an('Object');
        expect(user_configuration).to.have.property('auth');
        expect(user_configuration.auth).to.have.property('username', 'USERNAME_USER_1');
        expect(user_configuration.auth).to.have.property('password', 'PASSWORD_USER_1');

        expect(user_configuration).to.have.property('random_file');
        expect(user_configuration.random_file).to.have.property('random_data', 'random_data');
    });

});
