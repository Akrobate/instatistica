'use strict';

const fs = require('fs');
const minimist = require('minimist');

let argv = minimist(process.argv.slice(2));

// todo: process better argv management
//console.log(argv);
//process.exit(0);

// Params checker
let params = process.argv;
if (process.argv[2] === undefined || process.argv[3] === undefined) {
    console.log("params missing. First param: followers file, second parameter following file");
    process.exit(1);
}

let following_lock_file = null;
let followers_file = process.argv[2];
let following_file = process.argv[3];

if (process.argv[4] !== undefined) {
    following_lock_file = process.argv[4];
}
// loading files

let followers;
let following;
let following_lock;

console.log(followers_file);
fs.readFile(followers_file, 'utf8', (err, followers_string) => {
    followers = JSON.parse(followers_string);
    fs.readFile(following_file, 'utf8', (err, following_string) => {
        following = JSON.parse(following_string);
//        console.log(followers[0]);
//        console.log(following[0]);
//
//        console.log(followers[200]);
//        console.log(following[179]);

        let delta = getNotFollowersInFollowing(followers, following);

        if (following_lock_file !== null) {
            fs.readFile(following_lock_file, 'utf8', (err, following_lock_string) => {
                following_lock = JSON.parse(following_lock_string);
                delta = excludeLockFollowing(delta, following_lock);
                console.log(delta);
                console.log("Not follow me, count but with delta: " + delta.length);
            });
        } else {
            console.log(delta);
            console.log("Not follow me, count : " + delta.length);
        }
    });
});


function getNotFollowersInFollowing(followers_array, following_array) {
    return following_array.filter((value, index, ar) => {
        let found = followers_array.find((val) => {
            return (value.name == val.name);
        });
        if (found === undefined) {
            return true;
        }
        return false;
    });
}


function excludeLockFollowing(following_list, following_exclude_list) {
    return following_list.filter((value, index, ar) => {
        let found = following_exclude_list.find((val) => {
            return (value.name == val.name);
        });
        if (found === undefined) {
            return true;
        }
        return false;
    });
}
