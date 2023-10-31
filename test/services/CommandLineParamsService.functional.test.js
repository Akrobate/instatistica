'use strict';

const {
    expect,
} = require('chai');
const {
    mock,
} = require('sinon');
const {
    CommandLineParamsService,
} = require('../../services');

const {
    Logger,
} = require('../../logger');

const logger = Logger.getInstance();

describe('CommandLineParamsService functional test', () => {

    const mocks = {};

    beforeEach(() => {
        mocks.logger = mock(logger);
        mocks.process = mock(process);
    });

    afterEach(() => {
        mocks.logger.restore();
        mocks.process.restore();
    });


    describe('getParam', () => {
        it('getParam', () => {
            const command_line_params_service = new CommandLineParamsService();
            command_line_params_service.params = {
                test: 'value',
            };
            const param = command_line_params_service.getParam('test');
            expect(param).to.equal('value');
        });

        it('getParam required', () => {
            const command_line_params_service = new CommandLineParamsService();
            command_line_params_service.params = {
                not_test: 'value',
            };
            try {
                command_line_params_service.getParam('test', true);
            } catch (error) {
                expect(error.message).to.equal('Missing param -test');
            }
        });
    });


    describe('processSchema named params', () => {
        it('processSchema nominal case', () => {
            const schema = {
                params: {
                    'count': {
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
                        help: 'First param',
                        default: undefined,
                    },
                    {
                        type: 'Number',
                        required: true,
                        help: 'Second param',
                        default: undefined,
                    },
                ],
            };

            const argv_seed = {
                'count': 10,
            };

            const command_line_params_service = new CommandLineParamsService();
            command_line_params_service.params = argv_seed;
            command_line_params_service.setCommandLineParamsSchema(schema);

            const response = command_line_params_service.processSchema();

            expect(response).to.have.property('count', 10);

        });

        it('processSchema with missing named required param without explanation', () => {

            mocks.logger.expects('log').withArgs('Missing param -other');
            mocks.process.expects('exit').returns();

            const schema = {
                params: {
                    'count': {
                        type: 'Number',
                        required: true,
                        help: 'Some explanation text',
                        default: undefined,
                    },
                    'other': {
                        type: 'Number',
                        required: true,
                        default: undefined,
                    },
                },
                array_params: [],
            };
            const command_line_params_service = new CommandLineParamsService(logger);
            command_line_params_service.params = {
                'count': 10,
            };
            command_line_params_service.setCommandLineParamsSchema(schema);

            command_line_params_service.processSchema();

            mocks.process.verify();
            mocks.logger.verify();

        });

        it('processSchema with missing named required param with explanation', () => {
            mocks.logger.expects('log').withArgs('Missing param -count, Some explanation text');
            mocks.process.expects('exit').returns();
            const schema = {
                params: {
                    'count': {
                        type: 'Number',
                        required: true,
                        help: 'Some explanation text',
                        default: undefined,
                    },
                },
                array_params: [],
            };
            const command_line_params_service = new CommandLineParamsService(logger);
            command_line_params_service.params = {};
            command_line_params_service.setCommandLineParamsSchema(schema);
            command_line_params_service.processSchema();
            mocks.process.verify();
            mocks.logger.verify();
        });
    });

    describe('processSchema array params', () => {
        it('processSchema nominal case', () => {
            const schema = {
                params: {
                    'count': {
                        type: 'Number',
                        required: false,
                        help: 'Some explanation text',
                        default: undefined,
                    },
                },
                array_params: [
                    {
                        type: 'Number',
                        required: true,
                        help: 'First param',
                        default: undefined,
                    },
                    {
                        type: 'Number',
                        required: true,
                        help: 'Second param',
                        default: undefined,
                    },
                ],
            };

            const argv_seed = {
                _: [
                    125,
                    456,
                ],
            };

            const command_line_params_service = new CommandLineParamsService();
            command_line_params_service.params = argv_seed;
            command_line_params_service.setCommandLineParamsSchema(schema);

            const response = command_line_params_service.processSchema();

            const [
                first_param,
                second_param,
            ] = response.array_params;

            expect(first_param).to.equal(125);
            expect(second_param).to.equal(456);

        });


        it('processSchema without named params', () => {
            const schema = {
                array_params: [
                    {
                        type: 'Number',
                        required: true,
                        help: 'First param',
                        default: undefined,
                    },
                    {
                        type: 'Number',
                        required: true,
                        help: 'Second param',
                        default: undefined,
                    },
                ],
            };

            const argv_seed = {
                _: [
                    125,
                    456,
                ],
            };

            const command_line_params_service = new CommandLineParamsService();
            command_line_params_service.params = argv_seed;
            command_line_params_service.setCommandLineParamsSchema(schema);

            const response = command_line_params_service.processSchema();
            const [
                first_param,
                second_param,
            ] = response.array_params;
            expect(first_param).to.equal(125);
            expect(second_param).to.equal(456);

        });


        it('processSchema missing param case', () => {

            mocks.logger.expects('log').withArgs('Missing not named param 2, Second param');
            mocks.process.expects('exit').returns();

            const schema = {
                params: {
                    'count': {
                        type: 'Number',
                        required: false,
                        help: 'Some explanation text',
                        default: undefined,
                    },
                },
                array_params: [
                    {
                        type: 'Number',
                        required: true,
                        help: 'First param',
                        default: undefined,
                    },
                    {
                        type: 'Number',
                        required: true,
                        help: 'Second param',
                        default: undefined,
                    },
                ],
            };

            const argv_seed = {
                _: [
                    125,
                ],
            };

            const command_line_params_service = new CommandLineParamsService(logger);
            command_line_params_service.params = argv_seed;
            command_line_params_service.setCommandLineParamsSchema(schema);
            command_line_params_service.processSchema();
            mocks.process.verify();
            mocks.logger.verify();
        });

        it('processSchema missing param case', () => {

            mocks.logger.expects('log').withArgs('Missing not named param 1, First param');
            mocks.process.expects('exit').returns();

            const schema = {
                params: {
                    'count': {
                        type: 'Number',
                        required: false,
                        help: 'Some explanation text',
                        default: undefined,
                    },
                },
                array_params: [
                    {
                        type: 'Number',
                        required: true,
                        help: 'First param',
                        default: undefined,
                    },
                ],
            };

            const argv_seed = {
                _: [],
            };

            const command_line_params_service = new CommandLineParamsService(logger);
            command_line_params_service.params = argv_seed;
            command_line_params_service.setCommandLineParamsSchema(schema);
            command_line_params_service.processSchema();
            mocks.process.verify();
            mocks.logger.verify();
        });
    });

    describe.only('processSchema default params', () => {
        it('No param, but default param', () => {
            const schema = {
                params: {
                    'sort': {
                        type: 'Number',
                        required: false,
                        help: 'Some explanation text',
                        default: 'Default_value',
                    },
                },
            };

            const argv_seed = {};

            const command_line_params_service = new CommandLineParamsService();
            command_line_params_service.params = argv_seed;
            command_line_params_service.setCommandLineParamsSchema(schema);

            const response = command_line_params_service.processSchema();

            expect(response).to.have.property('sort', 'Default_value');

        });

        it('Has param and default param, input param should pass', () => {
            const schema = {
                params: {
                    'sort': {
                        type: 'Number',
                        required: false,
                        help: 'Some explanation text',
                        default: 'Default_value',
                    },
                },
            };

            const argv_seed = {
                'sort': 'input_value',
            };

            const command_line_params_service = new CommandLineParamsService();
            command_line_params_service.params = argv_seed;
            command_line_params_service.setCommandLineParamsSchema(schema);

            const response = command_line_params_service.processSchema();

            expect(response).to.have.property('sort', 'input_value');

        });
    });
});
