'use strict';

const {
    JsonFileRepository,
} = require('../repositories');
const {
    logger,
} = require('../logger');
class AbstractBookMarkService {


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
     * @returns {AbstractBookMarkService}
     */
    static getInstance() {
        if (AbstractBookMarkService.instance) {
            return AbstractBookMarkService.instance;
        }
        AbstractBookMarkService.instance = AbstractBookMarkService.buildInstance();
        return AbstractBookMarkService.instance;
    }


    /**
     * @static
     * @returns {AbstractBookMarkService}
     */
    static buildInstance() {
        return new AbstractBookMarkService(
            JsonFileRepository.getInstance()
        );
    }


    /**
     * @param {String} status
     * @returns {Array}
     */
    async search(status = null) {
        let book_mark_list = [];
        try {
            book_mark_list = await this.json_file_repository.getData(this.book_mark_filename);
        } catch (error) {
            logger.log('No json file found, error: ', error.message);
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
        await this.json_file_repository.saveData(data, this.book_mark_filename);
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
                    status: AbstractBookMarkService.TO_PROCESS,
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
        await this.json_file_repository.removeData(this.book_mark_filename);
    }


    /**
     *
     * @param {String} item
     * @returns {Void}
     */
    async setProcessedItem(item) {
        const book_mark_list = await this.search();
        const index = book_mark_list.findIndex((book_mark) => book_mark.name === item);
        book_mark_list[index].status = AbstractBookMarkService.PROCESSED;
        await this.save(book_mark_list);
    }
}

AbstractBookMarkService.instance = null;
const book_mark_service = AbstractBookMarkService.buildInstance();

module.exports = {
    AbstractBookMarkService,
    book_mark_service,
};
