'use strict';

const {
    ConfigurationLoaderService,
} = require('../../services');

const {
    JsonFileRepository,
    FileRepository,
} = require('../../repositories');

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

describe.only('ConfigurationLoaderService functional test', () => {

    beforeEach(() => {
        stubs.getDataFolder = stub(json_file_repository, 'getDataFolder')
            .callsFake(() => `${__dirname}/../data_working_folder/`);
        return null;
    });

    afterEach(() => {
        stubs.getDataFolder.restore();
    });


    it('Check stub correcty setted the data folder path', (done) => {
        const data_folder = json_file_repository.getDataFolder();
        expect(data_folder).to.equal(`${__dirname}/../data_working_folder/`);
        done();
    });


    it('Loading user_1 configuration', async () => {
        const user_configuration = await configuration_loader_service.loadConfiguration('user_1');
        console.log(user_configuration);
        expect(user_configuration).to.be.an('Object');
    });

});
