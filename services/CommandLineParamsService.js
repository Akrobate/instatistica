'use strict';

const {
    argv,
} = require('yargs');


// {
//     params: {
//         'param_name': {
//             type: 'Number',
//             required: true,
//             help: 'Some explanation text',
//             default: undefined,
//         },
//     },
//     array_params: [
//         {
//             type: 'Number',
//             required: true,
//             help: 'Some explanation text',
//             default: undefined,
//         },
//     ],
// }

class CommandLineParamsService {

    /**
     * @returns {CommandLineParamsService}
     */
    constructor() {
        this.params = argv;
        this.command_line_params_schema = {};
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
     * @returns {Object}
     */
    processSchema() {

        const {
            params,
        } = this.command_line_params_schema;

        const all_named_params = Object.keys(params);
        const required_named_params = [];
        all_named_params.forEach((param_name) => {
            if (params[param_name].required) {
                required_named_params.push(param_name);
            }
        });



        return {};
    }

    /**
     * @param {*} command_line_params_schema
     * @returns {Object}
     */
    setCommandLineParamsSchema(command_line_params_schema = {}) {
        this.command_line_params_schema = command_line_params_schema;
    }


    /**
     * @returns {string}
     */
    getHelp() {
        return 'Help...';
    }


    /**
     * @returns {void}
     */
    checkIfDisplayHelp() {
        const param_h = this.getParam('h');
        const param_help = this.getParam('help');
        if (param_h || param_help) {
            console.log(this.getHelp());
            // eslint-disable-next-line no-process-exit
            process.exit();
        }
    }

}

CommandLineParamsService.instance = null;

const command_line_params_service = CommandLineParamsService.getInstance();

module.exports = {
    CommandLineParamsService,
    command_line_params_service,
};
