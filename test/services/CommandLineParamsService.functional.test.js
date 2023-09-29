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

describe.only('CommandLineParamsService functional test', () => {

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
            const configuration_loader_service = new CommandLineParamsService();
            configuration_loader_service.params = {
                test: 'value',
            };
            const param = configuration_loader_service.getParam('test');
            expect(param).to.equal('value');
        });

        it('getParam required', () => {
            const configuration_loader_service = new CommandLineParamsService();
            configuration_loader_service.params = {
                not_test: 'value',
            };
            try {
                configuration_loader_service.getParam('test', true);
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

            const configuration_loader_service = new CommandLineParamsService();
            configuration_loader_service.params = argv_seed;
            configuration_loader_service.setCommandLineParamsSchema(schema);

            const response = configuration_loader_service.processSchema();

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
            const configuration_loader_service = new CommandLineParamsService(logger);
            configuration_loader_service.params = {
                'count': 10,
            };
            configuration_loader_service.setCommandLineParamsSchema(schema);

            configuration_loader_service.processSchema();

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
            const configuration_loader_service = new CommandLineParamsService(logger);
            configuration_loader_service.params = {};
            configuration_loader_service.setCommandLineParamsSchema(schema);
            configuration_loader_service.processSchema();
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

            const configuration_loader_service = new CommandLineParamsService();
            configuration_loader_service.params = argv_seed;
            configuration_loader_service.setCommandLineParamsSchema(schema);

            const response = configuration_loader_service.processSchema();

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

            const configuration_loader_service = new CommandLineParamsService(logger);
            configuration_loader_service.params = argv_seed;
            configuration_loader_service.setCommandLineParamsSchema(schema);
            configuration_loader_service.processSchema();
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

            const configuration_loader_service = new CommandLineParamsService(logger);
            configuration_loader_service.params = argv_seed;
            configuration_loader_service.setCommandLineParamsSchema(schema);
            configuration_loader_service.processSchema();
            mocks.process.verify();
            mocks.logger.verify();
        });
    });
});
