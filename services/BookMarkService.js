'use strict';

class BookMarkService {

    /**
     * @static
     * @returns {JsonFile}
     */
    static getInstance() {
        if (BookMarkService.instance) {
            return BookMarkService.instance;
        }
        BookMarkService.instance = new BookMarkService();
        return BookMarkService.instance;
    }

}

BookMarkService.instance = null;

module.exports = {
    BookMarkService,
};
