'use strict';

const {
    expect,
} = require('chai');
const {
    mock,
} = require('sinon');

const {
    TerminalInputService,
} = require('../../services/TerminalInputService');

describe('TerminalInputService', () => {

    const mocks = {};

    it('Should be able to parse input', () => {
        const argv_seed = [
            '__TECHNICAL_PARAM',
            '__TECHNICAL_PARAM',
            'value_param_1',
            'value_param_2',
            'value_param_3',
        ];
        const terminal_input_service = new TerminalInputService(argv_seed);

        const param_list = [
            {
                output: 'param_1',
                position: 0,
                required: true,
            },
            {
                output: 'param_2',
                position: 1,
                required: true,
            },
            {
                output: 'param_3',
                position: 2,
                required: false,
            },
        ];

        const result = terminal_input_service.extractParams({
            param_list,
            help_message: 'MESSAGE',
        });

        expect(result).to.be.an('Object');
        expect(result).to.have.property('param_1', 'value_param_1');
        expect(result).to.have.property('param_2', 'value_param_2');
        expect(result).to.have.property('param_3', 'value_param_3');
    });

    it('Should be able to manage optional argument', () => {
        const argv_seed = [
            '__TECHNICAL_PARAM',
            '__TECHNICAL_PARAM',
            'value_param_1',
            'value_param_2',
        ];
        const terminal_input_service = new TerminalInputService(argv_seed);

        const param_list = [
            {
                output: 'param_1',
                position: 0,
                required: true,
            },
            {
                output: 'param_2',
                position: 1,
                required: true,
            },
            {
                output: 'param_3',
                position: 2,
                required: false,
            },
        ];

        const result = terminal_input_service.extractParams({
            param_list,
            help_message: 'MESSAGE',
        });

        expect(result).to.be.an('Object');
        expect(result).to.have.property('param_1', 'value_param_1');
        expect(result).to.have.property('param_2', 'value_param_2');
        expect(result).to.have.property('param_3', null);
    });

    it('Should log help if required param is not defined', () => {

        const argv_seed = [
            '__TECHNICAL_PARAM',
            '__TECHNICAL_PARAM',
            'value_param_1',
            'value_param_2',
        ];
        const terminal_input_service = new TerminalInputService(argv_seed);
        mocks.terminal_input_service = mock(terminal_input_service);

        const param_list = [
            {
                output: 'param_1',
                position: 0,
                required: true,
            },
            {
                output: 'param_2',
                position: 1,
                required: true,
            },
            {
                output: 'param_3',
                position: 2,
                required: true,
            },
        ];

        const result = terminal_input_service.extractParams({
            param_list,
            help_message: 'REQUIRED PARAM MISSING: command example',
        });

        expect(result).to.equal(null);
        mocks.terminal_input_service
            .expect('outputMessage')
            .once()
            .withArgs('REQUIRED PARAM MISSING: command example');
        mocks.terminal_input_service.restore();

    });

    describe('Submethods test', () => {

        it('checkRequireParam - Nominal case', () => {
            const terminal_input_service = new TerminalInputService();

            const param_list = [
                {
                    output: 'param_1',
                    position: 0,
                    required: true,
                },
                {
                    output: 'param_2',
                    position: 1,
                    required: true,
                },
            ];

            const output = {
                param_1: 'something',
                param_2: 'something',
            };

            const response = terminal_input_service.checkRequireParam(param_list, output);
            expect(response).to.equal(true);
        });

        it('checkRequireParam - Missing required param', () => {
            const terminal_input_service = new TerminalInputService();

            const param_list = [
                {
                    output: 'param_1',
                    position: 0,
                    required: true,
                },
                {
                    output: 'param_2',
                    position: 1,
                    required: true,
                },
            ];

            const output = {
                param_1: 'something',
                param_2: null,
            };

            const response = terminal_input_service.checkRequireParam(param_list, output);
            expect(response).to.equal(false);
        });

        it('checkRequireParam - Optionnal param can be null', () => {
            const terminal_input_service = new TerminalInputService();

            const param_list = [
                {
                    output: 'param_1',
                    position: 0,
                    required: true,
                },
                {
                    output: 'param_2',
                    position: 1,
                    required: false,
                },
            ];

            const output = {
                param_1: 'something',
                param_2: null,
            };

            const response = terminal_input_service.checkRequireParam(param_list, output);
            expect(response).to.equal(true);
        });

    });
});
