'use strict';

class TerminalInputService {


    /**
     * @param {Object} process_argv
     */
    constructor(process_argv) {
        this.argv = process_argv;
    }

    /**
     * {
     *      outuput: <String>
     *      position: <Int>
     *      required: <Bool> Default true
     * }
     * @param {Object} params_schema
     * @return {array}
     */
    extractParams(params_schema = {}) {
        const {
            param_list,
            // eslint-disable-next-line no-unused-vars
            help_message,
        } = params_schema;

        const param_argv_shift = 2;
        const output = {};
        param_list.forEach((param) => {
            output[param.outuput] = this
                .returnNullIfUndefinedArgv(param_argv_shift + param.position);
        });

        if (!this.checkRequireParam(param_list, output)) {
            this.outputMessage(help_message);
            return null;
        }

        return output;
    }


    /**
     * @param {Array} argv_position
     * @return {String|Null}
     */
    returnNullIfUndefinedArgv(argv_position) {
        if (this.argv[argv_position] === undefined) {
            return null;
        }
        return this.argv[argv_position];
    }


    /**
     * @todo
     * @param {Object} param_list
     * @param {Object} output
     * @return {bool}
     */
    checkRequireParam(param_list, output) {
        return true;
    }


    /**
     * @param {String} message
     * @return {Void}
     */
    outputMessage(message) {
        console.log(message);
    }

}

const terminal_input_service = new TerminalInputService();

module.exports = {
    TerminalInputService,
    terminal_input_service,
};
