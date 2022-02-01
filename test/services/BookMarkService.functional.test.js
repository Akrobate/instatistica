'use strict';

const {
    BookMarkService,
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
const class_book_mark_service = new BookMarkService(json_file_repository);

const stubs = {};

describe('test', () => {

    beforeEach(async () => {
        stubs.getDataFolder = stub(json_file_repository, 'getDataFolder')
            .callsFake(() => `${__dirname}/../data_working_folder/`);
        try {
            await class_book_mark_service.deleteAllTagsToProcess();
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


    it('Should be able to save file with tags saveAndDeduplicateTagsListToProcess', async () => {
        const data_folder = json_file_repository.getDataFolder();
        const tag_list = [
            'tag_1',
            'tag_2',
            'tag_3',
        ];
        await class_book_mark_service.saveAndDeduplicateTagsListToProcess(tag_list);
        const tags_to_process = await class_book_mark_service.getTagsToProcess('TO_PROCESS');
        console.log(tags_to_process);
    });

});
