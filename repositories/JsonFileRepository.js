'use strict';

const fs = require('fs').promises;

class JsonFileRepository {


    /**
     * @returns {String}
     */
    static get DATA_FOLDER() {
        return `${__dirname}/../data/`;
    }


    /**
     * @returns {String}
     */
    static get FILENAME() {
        return 'default_file.json';
    }

    /**
     * @static
     * @returns {JsonFileRepository}
     */
    static getInstance() {
        if (JsonFileRepository.instance) {
            return JsonFileRepository.instance;
        }
        JsonFileRepository.instance = new JsonFileRepository();
        return JsonFileRepository.instance;
    }

    /**
     * @returns {JsonFileRepository}
     */
    constructor() {
        this.filename = null;
    }

    /**
     * @return {Object}
     */
    async getData() {
        const filename = this.getFileNameWithPath();
        const string_data = await fs.readFile(filename);
        return JSON.parse(string_data);
    }


    /**
     * @param {Object} data
     * @return {Object}
     */
    async saveData(data) {
        const filename = this.getFileNameWithPath();
        const string_data = JSON.stringify(data);
        const response = await fs.writeFile(filename, string_data);
        return response;
    }

    /**
     * @returns {String}
     */
    getFileNameWithPath() {
        return this.filename === null
            ? `${JsonFileRepository.DATA_FOLDER}${JsonFileRepository.FILENAME}`
            : `${JsonFileRepository.DATA_FOLDER}${this.filename}`;
    }

    /**
     * @param {String} filename
     * @returns {void}
     */
    setFileName(filename) {
        this.filename = filename;
    }
}

module.exports = {
    JsonFileRepository,
};