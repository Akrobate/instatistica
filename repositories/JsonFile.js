'use strict';

const fs = require('fs').promises;

class JsonFile {


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
     * @returns {JsonFile}
     */
    static getInstance() {
        if (JsonFile.instance) {
            return JsonFile.instance;
        }
        JsonFile.instance = new JsonFile();
        return JsonFile.instance;
    }

    /**
     * @returns {JsonFile}
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
            ? `${JsonFile.DATA_FOLDER}${JsonFile.FILENAME}`
            : `${JsonFile.DATA_FOLDER}${this.filename}`;
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
    JsonFile,
};
