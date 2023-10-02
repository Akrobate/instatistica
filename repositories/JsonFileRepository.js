'use strict';

const fs = require('fs').promises;

class JsonFileRepository {

    /**
     * @static
     * @returns {JsonFileRepository}
     */
    static getInstance() {
        if (JsonFileRepository.instance === null) {
            JsonFileRepository.instance = new JsonFileRepository();
        }
        return JsonFileRepository.instance;
    }


    /**
     * path.join(configuration.getDataFolder(), filename)
     * @param {String} filename
     * @returns {Object}
     */
    async getData(filename) {
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
