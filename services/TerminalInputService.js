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
            output[param.outuput] = this.argv[param_argv_shift + param.position];
        });

        return output;
    }
}

const terminal_input_service = new TerminalInputService();

export {
    TerminalInputService,
    terminal_input_service,
};
