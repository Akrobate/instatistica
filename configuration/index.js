'use strict';

const path = require('path');

class Configuration {

    /**
     * @returns {String}
     */
    static get DATA_FOLDER() {
        return path.join(__dirname, '..', 'data');
    }

    /**
     * @return {Configuration}
     */
    static getInstance() {
        if (Configuration.instance === null) {
            Configuration.instance = new Configuration();
        }
        return Configuration.instance;
    }

    /**
     * @returns {String}
     */
    getDataFolder() {
        return this.constructor.DATA_FOLDER;
    }

}

Configuration.instance = null;
const configuration = Configuration.getInstance();


module.exports = {
    Configuration,
    configuration,
};


