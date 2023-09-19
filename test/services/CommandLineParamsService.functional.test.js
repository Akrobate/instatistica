'use strict';

const {
    expect,
} = require('chai');

const {
    CommandLineParamsService,
} = require('../../services');

describe.only('CommandLineParamsService functional test', () => {
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


    describe('processSchema', () => {
        it('processSchema', () => {
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
    });
});
