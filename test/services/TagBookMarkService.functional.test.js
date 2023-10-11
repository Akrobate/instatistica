'use strict';

const {
    TagBookMarkService,
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

const json_file_repository = JsonFileRepository.getInstance();
let tag_book_mark_service = null;

const stubs = {};

describe('TagBookMarkService functional test', () => {

    beforeEach(async () => {
        stubs.getDataFolder = stub(configuration, 'getDataFolder')
            .callsFake(() => path.join(__dirname, '..', 'data_working_folder'));
        tag_book_mark_service = new TagBookMarkService(json_file_repository);
        try {
            await tag_book_mark_service.deleteAll();
        } catch (error) {
            console.log('No file to delete');
        }
    });

    afterEach(() => {
        stubs.getDataFolder.restore();
    });

    it('Should be able to save file with tags saveAndDeduplicateList', async () => {

        const tag_list = [
            'tag_1',
            'tag_2',
            'tag_3',
        ];
        await tag_book_mark_service.saveAndDeduplicateList(tag_list);
        const tags_to_process = await tag_book_mark_service.search();
        const [
            tag_1,
            tag_2,
            tag_3,
        ] = tags_to_process;

        expect(tag_1).to.have.property('name', 'tag_1');
        expect(tag_1).to.have.property('status', 'TO_PROCESS');
        expect(tag_2).to.have.property('name', 'tag_2');
        expect(tag_2).to.have.property('status', 'TO_PROCESS');
        expect(tag_3).to.have.property('name', 'tag_3');
        expect(tag_3).to.have.property('status', 'TO_PROCESS');

    });


    it('Should be able to change tag to processed', async () => {

        const tag_list = [
            'tag_1',
            'tag_2',
            'tag_3',
        ];
        await tag_book_mark_service.saveAndDeduplicateList(tag_list);
        await tag_book_mark_service.setProcessedItem('tag_2');
        const tags_to_process = await tag_book_mark_service.search();

        const [
            tag_1,
            tag_2,
            tag_3,
        ] = tags_to_process;

        expect(tag_1).to.have.property('name', 'tag_1');
        expect(tag_1).to.have.property('status', 'TO_PROCESS');

        expect(tag_2).to.have.property('name', 'tag_2');
        expect(tag_2).to.have.property('status', 'PROCESSED');

        expect(tag_3).to.have.property('name', 'tag_3');
        expect(tag_3).to.have.property('status', 'TO_PROCESS');

    });


    it('Should be able to delete all tag data', async () => {

        const username_list = [
            'tag_1',
        ];
        await tag_book_mark_service.saveAndDeduplicateList(username_list);
        const usernames_to_process = await tag_book_mark_service.search();
        expect(usernames_to_process).to.be.an('Array').and.have.lengthOf(1);

        await tag_book_mark_service.deleteAll();
        const usernames_to_process_after_delete = await tag_book_mark_service.search();

        expect(usernames_to_process_after_delete).to.be.an('Array').and.have.lengthOf(0);
    });

});
