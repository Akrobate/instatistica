'use strict';

const fs = require('fs');

class FileRepository {

    /**
     * @static
     * @returns {FileRepository}
     */
    static getInstance() {
        if (FileRepository.instance === null) {
            FileRepository.instance = new FileRepository();
        }
        return FileRepository.instance;
    }

    /**
     * @param {Object} directory
     * @return {Array}
     */
    async listFilesInDirectory(directory) {
        const file_list = await fs.promises.readdir(directory, {
            withFileTypes: true,
        });
        return file_list
            .filter((dirent) => dirent.isFile())
            .map((item) => item.name);
    }
}

FileRepository.instance = null;

module.exports = {
    FileRepository,
};
