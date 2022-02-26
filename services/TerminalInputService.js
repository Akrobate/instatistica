'use strict';

class TerminalInputService {

    /**
     * @return {array}
     */
    extractParams() {

        const params = process.argv;
        if (process.argv[2] === undefined || process.argv[3] === undefined) {
            console.log("params missing. First param: followers file, second parameter following file");
            process.exit(1);
        }

        let following_lock_file = null;
        let followers_file = process.argv[2];
        let following_file = process.argv[3];

        if (process.argv[4] !== undefined) {
            following_lock_file = process.argv[4];
        }

    }
}

const terminal_input_service = new TerminalInputService();

export {
    TerminalInputService,
    terminal_input_service,
};
