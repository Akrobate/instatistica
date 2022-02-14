'use strict';

const {
    JsonFileRepository,
} = require('../repositories');

class BookMarkService {


    /**
     * @param {JsonFileRepository} json_file_repository
     */
    constructor(json_file_repository) {
        this.json_file_repository = json_file_repository;
        this.book_mark_filename = '';
    }


    /**
     * @static
     */
    static get TO_PROCESS() {
        return 'TO_PROCESS';
    }


    /**
     * @static
     */
    static get PROCESSED() {
        return 'PROCESSED';
    }


    /**
     * @static
     * @returns {BookMarkService}
     */
    static getInstance() {
        if (BookMarkService.instance) {
            return BookMarkService.instance;
        }
        BookMarkService.instance = BookMarkService.buildInstance();
        return BookMarkService.instance;
    }


    /**
     * @static
     * @returns {BookMarkService}
     */
    static buildInstance() {
        return new BookMarkService(
            JsonFileRepository.getInstance()
        );
    }


    /**
     * @param {String} status
     * @returns {Array}
     */
    async search(status = null) {
        this.json_file_repository.setFileName(this.book_mark_filename);
        let book_mark_list = [];
        try {
            book_mark_list = await this.json_file_repository.getData();
        } catch (error) {
            console.log('No json file found, error: ', error.message);
        }
        if (status !== null) {
            return book_mark_list.filter((book_mark) => book_mark.status === status);
        }
        return book_mark_list;
    }


    /**
     * @param {Array} data
     * @returns {Void}
     */
    async save(data) {
        this.json_file_repository.setFileName(this.book_mark_filename);
        await this.json_file_repository.saveData(data);
    }


    /**
     *
     * @param {Array} book_mark_list
     * @returns {Void}
     */
    async saveAndDeduplicateList(book_mark_list) {
        const saved_book_mark_list = await this.search();
        book_mark_list.forEach((item) => {
            if (
                saved_book_mark_list
                    .find((book_mark) => book_mark.name === item) === undefined
            ) {
                saved_book_mark_list.push({
                    name: item,
                    status: BookMarkService.TO_PROCESS,
                });
            }
        });
        await this.save(saved_book_mark_list);
    }


    /**
     *
     * @param {Array} book_mark_list
     * @returns {Void}
     */
    async deleteAll() {
        this.json_file_repository.setFileName(this.book_mark_filename);
        await this.json_file_repository.removeData();
    }


    /**
     *
     * @param {String} item
     * @returns {Void}
     */
    async setProcessedItem(item) {
        const book_mark_list = await this.search();
        const index = book_mark_list.findIndex((book_mark) => book_mark.name === item);
        book_mark_list[index].status = BookMarkService.PROCESSED;
        await this.save(book_mark_list);
    }
}

BookMarkService.instance = null;
const book_mark_service = BookMarkService.buildInstance();

module.exports = {
    BookMarkService,
    book_mark_service,
};
