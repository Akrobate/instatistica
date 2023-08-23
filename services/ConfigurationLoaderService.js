'use strict';

const {
    JsonFileRepository,
    FileRepository,
} = require('../repositories');
console.log(FileRepository)
/**
 * Work in progress:
 * Class that will manage all user accouts and configurations
 */
class ConfigurationLoaderService {

    constructor(json_file_repository, file_repository) {

        console.log(file_repository);
        this.configuration_files_path = null;
        this.json_file_repository = json_file_repository;
        this.file_repository = file_repository;
        this.users_files_path = 'users/'
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
     * 
     * @param {String} user_configuration_name 
     * @returns 
     */
    async loadConfiguration(username) {
        const files = await this.file_repository.listFilesInDirectory(
            `${this.json_file_repository.getDataFolder()}${this.users_files_path}/configurations/${username}`
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
