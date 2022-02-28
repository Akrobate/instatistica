'use strict';

class TerminalInputService {

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
            params_list,
            help_message,
        } = params_schema;

        const params = process.argv;
        if (process.argv[2] === undefined || process.argv[3] === undefined) {
            console.log(help_message);
            process.exit(1);
        }

        let following_lock_file = null;
        let followers_file = process.argv[2];
        let following_file = process.argv[3];
    }
}

const terminal_input_service = new TerminalInputService();

export {
    TerminalInputService,
    terminal_input_service,
};
