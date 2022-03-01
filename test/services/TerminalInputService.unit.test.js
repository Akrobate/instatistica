'use strict';

const {
    expect,
} = require('chai');
const {
    TerminalInputService,
} = require('../../src/services/TerminalInputService');

describe('TerminalInputService', () => {

    it('Should be able to parse input', () => {
        const argv = [];
        const terminal_input_service = new TerminalInputService(argv);

        const params = [
            {
                outuput: 'first_param',
                position: 1,
                required: true,
            },
        ];

        const result = terminal_input_service.extractParams({
            params,
        });

        expect(result).to.be.an('Object');
    });
});
