'use strict';

class StatisticScriptCommonsService {

    /**
     * @param {String} str
     * @returns {Array}
     */
    static extractHashtags(str) {
        const regexp = /(#\S+)/g;
        return [...str.matchAll(regexp)].map((item) => item[0]);
    }
}

StatisticScriptCommonsService.instance = null;

module.exports = {
    StatisticScriptCommonsService,
};
