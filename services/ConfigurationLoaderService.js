'use strict';

const {
    JsonFileRepository,
} = require('../repositories');

/**
 * Work in progress:
 * Class that will manage all user accouts and configurations
 */
class ConfigurationLoaderService {

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

}

ConfigurationLoaderService.instance = null;
const configuration_loader_service = ConfigurationLoaderService.buildInstance();

module.exports = {
    ConfigurationLoaderService,
    configuration_loader_service,
};
