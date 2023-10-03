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
        const user_configuration_path = path.join(
            this.users_files_path,
            'configurations',
            username
        );

        const result = await this.loadJsonFilesFromFolder(
            path.join(configuration.getDataFolder(), user_configuration_path)
        );

        return result;
    }


    /**
     * @param {String} json_files_folder
     * @returns {Object}
     */
    async loadJsonFilesFromFolder(json_files_folder) {
        const files = await this.file_repository
            .listFilesInDirectory(json_files_folder);

        const result = {};
        for (const file of files) {
            result[file.replace('.json', '')] = await this.json_file_repository
                .getData(path.join(json_files_folder, file));
        }

        return result;
    }

}

ConfigurationLoaderService.instance = null;
const configuration_loader_service = ConfigurationLoaderService.getInstance();

module.exports = {
    ConfigurationLoaderService,
    configuration_loader_service,
};
