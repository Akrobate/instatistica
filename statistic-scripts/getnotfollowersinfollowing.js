'use strict';

const fs = require('fs');

// To test
// const minimist = require('minimist');
// let argv = minimist(process.argv.slice(2));


// @todo process better argv management
// console.log(argv);
// process.exit(0);

// Params checker
const params = process.argv;
if (process.argv[2] === undefined || process.argv[3] === undefined) {
    console.log('params missing. First param: followers file, second parameter following file');
    // eslint-disable-next-line no-process-exit
    process.exit(1);
}

const [
    ,
    ,
    followers_file, // process.argv[2];
    following_file, // process.argv[3];
    following_lock_file, // process.argv[4];
] = params;


let followers = {};
let following = {};
let following_lock = {};


function getNotFollowersInFollowing(followers_array, following_array) {
    return following_array.filter((value) => {
        const found = followers_array.find((val) => {
            return (value.name === val.name);
        });
        if (found === undefined) {
            return true;
        }
        return false;
    });
}


function excludeLockFollowing(following_list, following_exclude_list) {
    return following_list.filter((value) => {
        const found = following_exclude_list.find((val) => {
            return (value.name === val.name);
        });
        if (found === undefined) {
            return true;
        }
        return false;
    });
}

fs.readFile(followers_file, 'utf8', (err, followers_string) => {
    if (err) {
        throw new Error('Follower file cannot be read');
    }
    followers = JSON.parse(followers_string);
    fs.readFile(following_file, 'utf8', (_err, following_string) => {
        if (_err) {
            throw new Error('following_file cannot be read');
        }
        following = JSON.parse(following_string);

        let delta = getNotFollowersInFollowing(followers, following);

        if (following_lock_file === null) {
            console.log(delta);
            console.log(`Not follow me, count : ${delta.length}`);
        } else {

            fs.readFile(following_lock_file, 'utf8', (__err, following_lock_string) => {
                if (__err) {
                    throw new Error('following_lock_file cannot be read');
                }
                following_lock = JSON.parse(following_lock_string);
                delta = excludeLockFollowing(delta, following_lock);
                console.log(delta);
                console.log(`Not follow me, count but with delta: ${delta.length}`);
            });
        }
    });
});

