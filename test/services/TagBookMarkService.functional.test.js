'use strict';

const {
    TagBookMarkService,
} = require('../../services');

const {
    JsonFileRepository,
} = require('../../repositories');

const {
    stub,
} = require('sinon');

const {
    expect,
} = require('chai');

const json_file_repository = new JsonFileRepository();
const tag_book_mark_service = new TagBookMarkService(json_file_repository);

const stubs = {};

describe('TagBookMarkService functional test', () => {

    beforeEach(async () => {
        stubs.getDataFolder = stub(json_file_repository, 'getDataFolder')
            .callsFake(() => `${__dirname}/../data_working_folder/`);
        try {
            await tag_book_mark_service.deleteAllTagsToProcess();
            await tag_book_mark_service.deleteAllUsernameToProcess();
        } catch (error) {
            console.log('No file to delete, error: ', error);
        }
    });

    afterEach(() => {
        stubs.getDataFolder.restore();
    });


    it('Check stub correcty setted the data folder path', (done) => {
        const data_folder = json_file_repository.getDataFolder();
        expect(data_folder).to.equal(`${__dirname}/../data_working_folder/`);
        done();
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

});
