'use strict';

const fs = require('fs').promises;
const {
    FileRepository,
} = require('./FileRepository');

console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", FileRepository.getInstance())


class JsonFileRepository {

    /**
     * @static
     * @returns {JsonFileRepository}
     */
    static getInstance() {
        if (JsonFileRepository.instance === null) {
            JsonFileRepository.instance = new JsonFileRepository(
                FileRepository.getInstance()
            );
        }
        return JsonFileRepository.instance;
    }


    /**
     * @param {FileRepository} file_repository
     */
    constructor(file_repository) {
        this.file_repository = file_repository;
    }

    /**
     * path.join(configuration.getDataFolder(), filename)
     * @param {String} filename
     * @returns {Object}
     */
    async getData(filename) {
        console.log("==========================>>>>>>>>>>", this.file_repository)
        const string_data = await this.file_repository
            .readFile(filename);
        return JSON.parse(string_data);
    }

    /**
     * path.join(configuration.getDataFolder(), filename)
     * @param {String} filename
     * @returns {Object}
     */
    async _getData(filename) {
        console.log("==========================", this.file_repository)
        const string_data = await fs.readFile(filename);
        return JSON.parse(string_data);
    }


    /**
     * @param {Object} data
     * @param {String} filename
     * @return {Object}
     */
    async saveData(data, filename) {
        const string_data = JSON.stringify(data);
        const response = await fs.writeFile(
            filename,
            string_data
        );
        return response;
    }


    /**
     * @param {String} filename
     * @return {Object}
     */
    async removeData(filename) {
        const response = await fs.unlink(filename);
        return response;
    }
}

JsonFileRepository.instance = null;

module.exports = {
    JsonFileRepository,
};
