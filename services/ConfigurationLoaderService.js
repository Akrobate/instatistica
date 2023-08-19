'use strict';

const {
    JsonFileRepository,
} = require('../repositories');

/**
 * Work in progress:
 * Class that will manage all user accouts and configurations
 */
class ConfigurationLoaderService {

    constructor() {
        this.configuration_files_path = null;
    }

    /**
     * @static
     * @returns {BookMarkService}
     */
    static getInstance() {
        if (ConfigurationLoaderService.instance === null) {
            ConfigurationLoaderService.instance = new ConfigurationLoaderService(
            );
        }
        return ConfigurationLoaderService.instance;
    }


    /**
     * @param {String} configuration_files_path 
     */
    setConfigurationFilesPath(configuration_files_path) {
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
     */
    loadConfiguration() {
        if (this.configuration_files_path === null) {
            throw new Error('Configuration file path is not set');
        }
        return {};
    }

}

ConfigurationLoaderService.instance = null;
const configuration_loader_service = ConfigurationLoaderService.buildInstance();

module.exports = {
    ConfigurationLoaderService,
    configuration_loader_service,
};
