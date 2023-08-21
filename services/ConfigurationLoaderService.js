'use strict';

const {
    JsonFileRepository,
} = require('../repositories');

/**
 * Work in progress:
 * Class that will manage all user accouts and configurations
 */
class ConfigurationLoaderService {

    constructor(json_file_repository) {
        this.configuration_files_path = null;
        this.json_file_repository = json_file_repository;
    }

    /**
     * @static
     * @returns {BookMarkService}
     */
    static getInstance() {
        if (ConfigurationLoaderService.instance === null) {
            ConfigurationLoaderService.instance = new ConfigurationLoaderService(
                JsonFileRepository.getInstance()
            );
        }
        return ConfigurationLoaderService.instance;
    }


    /**
     * @param {String} configuration_files_path 
     */
    setConfigurationFilesPath(configuration_files_path = './data/users_configurations') {
        this.configuration_files_path = configuration_files_path;
    }

    /**
     * @param {String} configuration_files_path 
     */
    getConfigurationFilesPath() {
        return this.configuration_files_path;
    }

    /**
     * 
     * @param {String} user_configuration_name 
     * @returns 
     */
    loadConfiguration(user_configuration_name) {
        if (this.configuration_files_path === null) {
            throw new Error('Configuration file path is not set');
        }
        return {};
    }

}

ConfigurationLoaderService.instance = null;
const configuration_loader_service = ConfigurationLoaderService.getInstance();

module.exports = {
    ConfigurationLoaderService,
    configuration_loader_service,
};
