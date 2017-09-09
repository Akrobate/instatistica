'use strict';

const fs = require('fs');

// Params checker
let params = process.argv;
if (process.argv[2] === undefined || process.argv[3] === undefined) {
    console.log("params missing. First param: followers file, second parameter following file");
    process.exit(1);
}

let followers_file = process.argv[2];
let following_file = process.argv[3];

// loading files

let followers;
let following;

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
        console.log("Not follow me, count : " + delta.length);
        console.log(delta);
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
