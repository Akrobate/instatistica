'use strict';

const JsonFileRepository = require('../repositories');

class BookMarkService {


    /**
     * @param {JsonFileRepository} json_file_repository
     */
    constructor(json_file_repository) {
        this.json_file_repository = json_file_repository;

        this.tags_to_process_filename = 'tags_to_process.json';
    }


    /**
     * @static
     * @returns {JsonFile}
     */
    static getInstance() {
        if (BookMarkService.instance) {
            return BookMarkService.instance;
        }
        BookMarkService.instance = new BookMarkService(
            JsonFileRepository.getInstance()
        );
        return BookMarkService.instance;
    }


    /**
     * @param {Array} data
     * @returns {Void}
     */
    async saveTagsToProcess(data) {
        this.json_file_repository.setFileName(this.tags_to_process_filename);
        await this.saveData(data);
    }


    /**
     * @returns {Array}
     */
    async getTagsToProcess() {
        this.json_file_repository.setFileName(this.tags_to_process_filename);
        const tag_list = await this.getData();
        return tag_list;
    }


    /**
     * @param {String} tag
     * @returns {Void}
     */
    async bookMarkTag(tag) {
        const tag_list = await this.getTagsToProcess();
        const tag_index = tag_list.findIndex((item) => item.tag === tag);
        tag_list[tag_index].status = 'PROCESSED';
        await this.saveTagsToProcess(tag_list);
    }

}

BookMarkService.instance = null;

module.exports = {
    BookMarkService,
};
