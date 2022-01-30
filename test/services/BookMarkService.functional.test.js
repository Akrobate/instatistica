'use strict';

const {
    BookMarkService,
} = require('../../services');

const {
    JsonFileRepository,
} = require('../../repositories');

const {
    mock,
    stub,
} = require('sinon');

const {
    expect,
} = require('chai');

const json_file_repository = new JsonFileRepository();
const class_book_mark_service = new BookMarkService(json_file_repository);

const stubs = {};

describe('test', () => {

    beforeEach(() => {
        stubs.getDataFolder = stub(json_file_repository, 'getDataFolder')
            .callsFake(() => 'test');
    });

    // afterEach(() => {});

    it('Should be able to save file with tags', (done) => {
        const data_folder = json_file_repository.getDataFolder();
        console.log(data_folder);

        expect(data_folder).to.equal('test');

        done();
    });

});
