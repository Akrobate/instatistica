'use strict';

const {
    argv,
} = require('yargs');

class CommandLineParamsService {

    /**
     * @returns {CommandLineParamsService}
     */
    constructor() {
        this.params = argv;
    }

    /**
     * @static
     * @returns {BookMarkService}
     */
    static getInstance() {
        if (CommandLineParamsService.instance === null) {
            CommandLineParamsService
                .instance = new CommandLineParamsService();
        }
        return CommandLineParamsService.instance;
    }


    /**
     * @param {String} key
     * @param {Boolen} required
     * @returns {String}
     */
    getParam(key, required = false) {
        if (this.params[key] === undefined && required) {
            throw new Error(`Missing param -${key}`);
        }
        return this.params[key];
    }

}

CommandLineParamsService.instance = null;

const command_line_params_service = CommandLineParamsService.getInstance();

module.exports = {
    CommandLineParamsService,
    command_line_params_service,
};
