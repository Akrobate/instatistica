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
     * @param {Boolen} help
     * @returns {String}
     */
    getParam(key, required = false, help = false) {
        if (this.params[key] === undefined && required) {
            throw new Error(help ? `Missing param -${key}, ${help}` : `Missing param -${key}`);
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
