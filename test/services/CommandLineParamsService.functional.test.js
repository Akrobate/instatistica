'use strict';

const {
    expect,
} = require('chai');

const {
    CommandLineParamsService,
} = require('../../services');

describe('CommandLineParamsService functional test', () => {
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
