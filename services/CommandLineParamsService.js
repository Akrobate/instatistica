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


    /**
     * @param {*} command_line_structure
     * @returns {Object}
     * configuration example:
     * {
     *      params: {
     *          'a': {
     *              type: Number,
     *           }
     *      }
     *
     * }
     */
    setCommandLineStructure(command_line_structure = {}) {
        const params_structure = {
            params: {
                'param_name': {
                    type: 'Number',
                    required: true,
                    help: 'Some explanation text',
                    default: undefined,
                },
            },
            array_params: [
                {
                    type: 'Number',
                    required: true,
                    help: 'Some explanation text',
                    default: undefined,
                },
            ],
        };
    }

    /**
     * @returns {string}
     */
    getHelp() {
        return '';
    }


    /**
     * @returns {void}
     */
    checkIfDisplayHelp() {
        const param_h = this.getParam('h');
        const param_help = this.getParam('help');
        if (param_h || param_help) {
            console.log(this.getHelp());
            process.exist();
        }
    }

}

CommandLineParamsService.instance = null;

const command_line_params_service = CommandLineParamsService.getInstance();

module.exports = {
    CommandLineParamsService,
    command_line_params_service,
};
