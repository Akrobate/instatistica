'use strict';

const {
    logger,
} = require('../logger');

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
     * @param {Array} str
     * @return {Array}
     */
    extractUniqHashtagsFromString(str) {
        return [
            ...new Set(StatisticScriptCommonsService.extractHashtags(str)),
        ];
    }
}

StatisticScriptCommonsService.instance = null;

module.exports = {
    StatisticScriptCommonsService,
};
