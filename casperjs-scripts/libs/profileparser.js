function getName(c, callback) {
    return c
        .waitForSelector("h1._rf3jb")
        .then(function(){
            var name = this.evaluate(function() {
                return document.querySelector('h1._rf3jb').textContent;
            });
            callback(name);
        })
}

module.exports.getName = getName;
