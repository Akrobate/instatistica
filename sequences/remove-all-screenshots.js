/**
 * Script to remove all screenshots
 *
 * Removes all screen shots from folders
 * @params SCREENSHOT_FOLDER Path to screenshot
 * @params SCREENSHOT_EXTENTION Filter file extention
 */

const {
    logger,
} = require('../logger');

const SCREENSHOT_FOLDER = `${__dirname}/../screenshots/`;
const SCREENSHOT_EXTENTION = 'png';

const fs = require('fs').promises;

(async () => {
    const data = await fs.readdir(SCREENSHOT_FOLDER);
    const screenshot_list = data.filter((file) => file.includes(`.${SCREENSHOT_EXTENTION}`));
    for (const screenshot_file of screenshot_list) {
        logger.log(screenshot_file);
        await fs.unlink(`${SCREENSHOT_FOLDER}/${screenshot_file}`);
    }
})();
