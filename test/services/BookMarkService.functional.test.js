'use strict';

const {
    BookMarkService,
} = require('../../services');

const {
    mock,
    stub,
} = require('sinon');

const ClassBookMarkService = BookMarkService;
const class_book_mark_service = BookMarkService.getInstance();



describe('test', () => {

    beforeEach(() => {
        console.log('In before each')

        stub(class_book_mark_service, 'tags_to_process_filename').callsFake(() => 'Tesst here');

        console.log('class_book_mark_service.tags_to_process_filename', class_book_mark_service.tags_to_process_filename)

        console.log('After In before each')
    });

    afterEach(() => {

    });

    it('Should be able to save file with tags', (done) => {
        console.log(class_book_mark_service)
        console.log(class_book_mark_service.constructor.__proto__)
        console.log(ClassBookMarkService)
        console.log(ClassBookMarkService.TO_PROCESS)
        console.log(class_book_mark_service.constructor.TO_PROCESS)
        console.log(typeof class_book_mark_service.constructor.TO_PROCESS)
        console.log(typeof ClassBookMarkService.TO_PROCESS)

        console.log(class_book_mark_service)

        done();
    });

});
