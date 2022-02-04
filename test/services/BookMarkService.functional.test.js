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
            await class_book_mark_service.deleteAllUsernameToProcess();
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

        const tag_list = [
            'tag_1',
            'tag_2',
            'tag_3',
        ];
        await class_book_mark_service.saveAndDeduplicateTagsListToProcess(tag_list);
        const tags_to_process = await class_book_mark_service.getTagsToProcess();

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
        await class_book_mark_service.saveAndDeduplicateTagsListToProcess(tag_list);
        await class_book_mark_service.bookMarkTag('tag_2');
        const tags_to_process = await class_book_mark_service.getTagsToProcess();

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


    it('Should be able to change tag to filter tags to process vs processes', async () => {

        const tag_list = [
            'tag_1',
            'tag_2',
            'tag_3',
        ];
        await class_book_mark_service.saveAndDeduplicateTagsListToProcess(tag_list);
        await class_book_mark_service.bookMarkTag('tag_1');
        let tags_to_process = null;

        tags_to_process = await class_book_mark_service.getTagsToProcess('TO_PROCESS');
        expect(tags_to_process).to.be.an('Array').and.have.lengthOf(2);

        tags_to_process = await class_book_mark_service.getTagsToProcess('PROCESSED');
        expect(tags_to_process).to.be.an('Array').and.have.lengthOf(1);

        tags_to_process = await class_book_mark_service.getTagsToProcess();
        expect(tags_to_process).to.be.an('Array').and.have.lengthOf(3);

    });

});
