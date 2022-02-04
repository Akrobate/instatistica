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

        this.tags_to_process_filename = 'tags_to_process.json';
        this.username_to_process_filename = 'username_to_process.json';
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
     * @param {Array} tag_list
     * @returns {Void}
     */
    async saveAndDeduplicateTagsListToProcess(tag_list) {
        const saved_tag_list = await this.getTagsToProcess();
        tag_list.forEach((item) => {
            const found_existing_tag = saved_tag_list
                .find((saved_tag) => saved_tag.name === item);
            if (found_existing_tag === undefined) {
                saved_tag_list.push({
                    name: item,
                    status: BookMarkService.TO_PROCESS,
                });
            }
        });
        await this.saveTagsToProcess(saved_tag_list);
    }


    /**
     * @param {Array} data
     * @returns {Void}
     */
    async saveTagsToProcess(data) {
        this.json_file_repository.setFileName(this.tags_to_process_filename);
        await this.json_file_repository.saveData(data);
    }


    /**
     * @param {String} status
     * @returns {Array}
     */
    async getTagsToProcess(status = null) {
        this.json_file_repository.setFileName(this.tags_to_process_filename);
        let tag_list = [];
        try {
            tag_list = await this.json_file_repository.getData();
        } catch (error) {
            console.log('No tag json file found, error: ', error.message);
        }
        if (status !== null) {
            return tag_list.filter((tag) => tag.status === status);
        }
        return tag_list;
    }


    /**
     * @param {String} tag
     * @returns {Void}
     */
    async bookMarkTag(tag) {
        const tag_list = await this.getTagsToProcess();
        const tag_index = tag_list.findIndex((item) => item.name === tag);
        tag_list[tag_index].status = BookMarkService.PROCESSED;
        await this.saveTagsToProcess(tag_list);
    }


    /**
     * @param {Array} data
     * @returns {Void}
     */
    async saveUsernameToProcess(data) {
        this.json_file_repository.setFileName(this.username_to_process_filename);
        await this.json_file_repository.saveData(data);
    }


    /**
     * @returns {Array}
     */
    async getUsernameToProcess() {
        this.json_file_repository.setFileName(this.username_to_process_filename);
        const username_list = await this.json_file_repository.getData();
        return username_list;
    }


    /**
     * @param {String} username
     * @returns {Void}
     */
    async bookMarkUsername(username) {
        const username_list = await this.getUsernameToProcess();
        const username_index = username_list.findIndex((item) => item.username === username);
        username_list[username_index].status = BookMarkService.PROCESSED;
        await this.saveUsernameToProcess(username_list);
    }


    /**
     * @param {Array} data
     * @returns {Void}
     */
    async deleteAllTagsToProcess() {
        this.json_file_repository.setFileName(this.tags_to_process_filename);
        await this.json_file_repository.removeData();
    }

    /**
     * @param {Array} data
     * @returns {Void}
     */
    async deleteAllUsernameToProcess() {
        this.json_file_repository.setFileName(this.username_to_process_filename);
        await this.json_file_repository.removeData();
    }
}

BookMarkService.instance = null;
const book_mark_service = BookMarkService.buildInstance();

module.exports = {
    BookMarkService,
    book_mark_service,
};
