'use strict';

const {
    UsernameBookMarkService,
} = require('../../services');

const {
    JsonFileRepository,
} = require('../../repositories');

const {
    configuration,
} = require('../../configuration');

const path = require('path');

const {
    stub,
} = require('sinon');

const {
    expect,
} = require('chai');

const json_file_repository = new JsonFileRepository();
const username_book_mark_service = new UsernameBookMarkService(json_file_repository);

const stubs = {};

describe('UsernameBookMarkService functional test', () => {

    beforeEach(async () => {
        stubs.getDataFolder = stub(configuration, 'getDataFolder')
            .callsFake(() => path.join(__dirname, '..', 'data_working_folder'));
        try {
            await username_book_mark_service.deleteAll();
        } catch (error) {
            console.log('No file to delete, error: ', error);
        }
    });

    afterEach(() => {
        stubs.getDataFolder.restore();
    });


    it('Should be able to save file with usernames saveAndDeduplicateList', async () => {

        const username_list = [
            'username_1',
            'username_2',
            'username_3',
        ];
        await username_book_mark_service.saveAndDeduplicateList(username_list);
        const usernames_to_process = await username_book_mark_service.search();

        const [
            username_1,
            username_2,
            username_3,
        ] = usernames_to_process;

        expect(username_1).to.have.property('name', 'username_1');
        expect(username_1).to.have.property('status', 'TO_PROCESS');
        expect(username_2).to.have.property('name', 'username_2');
        expect(username_2).to.have.property('status', 'TO_PROCESS');
        expect(username_3).to.have.property('name', 'username_3');
        expect(username_3).to.have.property('status', 'TO_PROCESS');

    });


    it('Should be able to change username to processed', async () => {

        const username_list = [
            'username_1',
            'username_2',
            'username_3',
        ];
        await username_book_mark_service.saveAndDeduplicateList(username_list);
        await username_book_mark_service.setProcessedItem('username_2');
        const usernames_to_process = await username_book_mark_service.search();
        const [
            username_1,
            username_2,
            username_3,
        ] = usernames_to_process;

        expect(username_1).to.have.property('name', 'username_1');
        expect(username_1).to.have.property('status', 'TO_PROCESS');

        expect(username_2).to.have.property('name', 'username_2');
        expect(username_2).to.have.property('status', 'PROCESSED');

        expect(username_3).to.have.property('name', 'username_3');
        expect(username_3).to.have.property('status', 'TO_PROCESS');

    });


    it('Should be able to delete add username data', async () => {

        const username_list = [
            'username_1',
        ];
        await username_book_mark_service.saveAndDeduplicateList(username_list);
        const usernames_to_process = await username_book_mark_service.search();
        expect(usernames_to_process).to.be.an('Array').and.have.lengthOf(1);

        await username_book_mark_service.deleteAll();
        const usernames_to_process_after_delete = await username_book_mark_service.search();

        expect(usernames_to_process_after_delete).to.be.an('Array').and.have.lengthOf(0);
    });

});
