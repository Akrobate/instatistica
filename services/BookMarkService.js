'use strict';

const JsonFileRepository = require('../repositories');

class BookMarkService {

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

}

BookMarkService.instance = null;

module.exports = {
    BookMarkService,
};
