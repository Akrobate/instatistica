# instatistica
Instagram API tests, statistics tools

# Rewriting new version (19/02/2022):

* added screenshot cleaner
* Migrating from casper js to standart headless chrome with pupetter
* Rewritted scripts in sequences
* old scripts in statistic-scripts and capserjs-scripts


# New version available automation scripts
## Cleaning screenshots

node sequence/remove-all-screenshots.js



## Getting the list of the followers (outdated)

Show all the followers of the connected user
The result is strored in data/followers/json

npm run getfollowers

## Automatic like posts of a tag (outdated)

npm run liketag like4like
