/* istanbul ignore file */

'use strict';

class Logger {

    /**
     *
     * @static
     * @returns {Logger}
     */
    static getInstance() {
        if (Logger.instance === null) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * @param {String|Object} message
     * @returns {void}
     */
    log(...message) {
        console.log(...message);
    }

    /**
     * @param {String|Object} message
     * @returns {void}
     */
    info(...message) {
        console.log(...message);
    }

    /**
     * @param {String|Object} message
     * @returns {void}
     */
    error(...message) {
        console.error(...message);
    }

    /**
     * @param {String|Object} message
     * @returns {void}
     */
    warn(...message) {
        console.warn(...message);
    }
}

Logger.instance = null;

module.exports = {
    logger: Logger.getInstance(),
    Logger,
};
