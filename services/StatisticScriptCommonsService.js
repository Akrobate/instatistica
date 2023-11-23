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
     * @param {String} str
     * @return {Array}
     */
    static extractUniqHashtagsFromString(str) {
        return [
            ...new Set(StatisticScriptCommonsService.extractHashtags(str)),
        ];
    }

    /**
     * @param {Array} tag_list
     * @return {Void}
     */
    static printTagList(tag_list) {
        tag_list.forEach((tag) => {
            logger.log(`#${tag.replace('#', '')}`);
        });
    }

    /**
     * @param {String} content
     * @param {String} word
     * @return {String}
     */
    static colorizeSection(content, word) {
        return content.replaceAll(word, `\x1b[31m${word}\x1b[0m`);
    }


    /**
     * @param {String} filename
     * @return {Array}
     */
    static async extractUniqHashtagsFromFile(filename) {
        const str = await FileRepository
            .getInstance()
            .readFileUtf8(filename);
        return StatisticScriptCommonsService.extractUniqHashtagsFromString(str);
    }


    /**
     * @param {Array} input
     * @param {string} sort_key
     * @param {boolean} asc
     * @returns {Array}
     */
    static sortArrayObj(input, sort_key, asc = false) {
        return [...input].sort((a, b) => {
            if (a[sort_key] > b[sort_key]) {
                return asc ? 1 : -1;
            } else if (a[sort_key] < b[sort_key]) {
                return asc ? -1 : 1;
            }
            return 0;
        });
    }
}

StatisticScriptCommonsService.instance = null;

module.exports = {
    StatisticScriptCommonsService,
};
