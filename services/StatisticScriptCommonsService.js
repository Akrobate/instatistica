'use strict';

const {
    logger,
} = require('../logger');

const {
    FileRepository,
} = require('../repositories');

class StatisticScriptCommonsService {

    /**
     * @param {String} str
     * @returns {Array}
     */
    static extractHashtags(str) {
        const regexp = /(#\S+)/g;
        return [...str.matchAll(regexp)].map((item) => item[0]);
    }


    /**
     * @param {Array} tag_list
     * @return {Void}
     */
    printTagList(tag_list) {
        tag_list.forEach((tag) => {
            logger.log(`#${tag.replace('#', '')}`);
        });
    }


    /**
     * @param {String} str
     * @return {Array}
     */
    extractUniqHashtagsFromString(str) {
        return [
            ...new Set(StatisticScriptCommonsService.extractHashtags(str)),
        ];
    }


    /**
     * @param {String} filename
     * @return {Array}
     */
    async extractUniqHashtagsFromFile(filename) {
        const str = await FileRepository
            .getInstance()
            .readFileUtf8(filename);
        return StatisticScriptCommonsService.extractUniqHashtagsFromString(str);
    }
}

StatisticScriptCommonsService.instance = null;

module.exports = {
    StatisticScriptCommonsService,
};
