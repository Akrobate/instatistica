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
     * @param {Object} logger
     * @returns {CommandLineParamsService}
     */
    constructor(logger = null) {
        this.params = argv;
        this.command_line_params_schema = {};
        this.logger = logger;
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
            throw new Error(`Missing param -${key}${
                help
                    ? `, ${help}`
                    : ''
            }`);
        }
        return this.params[key];
    }


    /**
     * @param {String} index
     * @param {Boolen} required
     * @param {Boolen} help
     * @returns {String}
     */
    getArrayParam(index, required = false, help = false) {
        if (this.params._) {
            if (this.params._[index] === undefined && required) {
                throw new Error(`Missing not named param ${index + 1}${
                    help
                        ? `, ${help}`
                        : ''
                }`);
            }
            return this.params._[index];
        }
        return undefined;
    }


    /**
     * @returns {Object}
     */
    processSchema() {

        const {
            params,
            array_params,
        } = this.command_line_params_schema;

        const all_named_params = Object.keys(params);
        const required_named_params = [];
        all_named_params.forEach((param_name) => {
            if (params[param_name].required) {
                required_named_params.push(param_name);
            }
        });

        const response = {
            array_params: [],
        };

        try {
            all_named_params.forEach((param_name) => {
                response[param_name] = this.getParam(
                    param_name,
                    params[param_name].required,
                    params[param_name].help
                );
            });

            if (array_params) {
                array_params.forEach((array_param, index) => {
                    response.array_params[index] = this
                        .getArrayParam(index, array_param.required, array_param.help);
                });
            }

        } catch (error) {
            this.printConsole(error.message);
            this.exit();
        }

        return response;
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
            this.exit();
        }
    }


    /**
     * @param {String} content
     * @returns {void}
     */
    printConsole(content) {
        if (this.logger && this.logger.log) {
            this.logger.log(content);
        }
    }


    /**
     * @returns {void}
     */
    exit() {
        // eslint-disable-next-line no-process-exit
        process.exit();
    }
}

CommandLineParamsService.instance = null;

const command_line_params_service = CommandLineParamsService.getInstance();

module.exports = {
    CommandLineParamsService,
    command_line_params_service,
};
