'use strict';

const {
    configuration,
} = require('../configuration');

const {
    JsonFileRepository,
    FileRepository,
} = require('../repositories');

const path = require('path');

/**
 * Work in progress:
 * Class that will manage all user accouts and configurations
 */
class ConfigurationLoaderService {

    /**
     * @param {*} json_file_repository
     * @param {*} file_repository
     */
    constructor(
        json_file_repository,
        file_repository
    ) {
        this.configuration_files_path = null;
        this.json_file_repository = json_file_repository;
        this.file_repository = file_repository;
        this.users_files_path = 'users/';
    }

    /**
     * @static
     * @returns {BookMarkService}
     */
    static getInstance() {
        if (ConfigurationLoaderService.instance === null) {
            ConfigurationLoaderService.instance = new ConfigurationLoaderService(
                JsonFileRepository.getInstance(),
                FileRepository.getInstance()
            );
        }
        return ConfigurationLoaderService.instance;
    }

    /**
     * @param {String} username
     * @returns {Object}
     */
    async loadConfiguration(username) {
        const files = await this.file_repository.listFilesInDirectory(
            path.join(
                configuration.getDataFolder(),
                this.users_files_path,
                'configurations',
                username
            )
        );
        console.log(files);
        return {};
    }

}

ConfigurationLoaderService.instance = null;
const configuration_loader_service = ConfigurationLoaderService.getInstance();

module.exports = {
    ConfigurationLoaderService,
    configuration_loader_service,
};
