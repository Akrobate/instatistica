module.exports = function login(c, auth) {
    return c
        // Click on login
        .waitForSelector("._b93kq").thenClick("._b93kq")

        // Fill the username and the password
        .then(function() {
            this.sendKeys('input[name="username"]', auth.username);
            this.sendKeys('input[name="password"]', auth.password);
            // count++;
            // this.capture('screenshots/sh-' + count + '.jpg');
            this.waitForSelector("._qv64e").thenClick("._qv64e");
        })

        // Wait for home to be loaded
        .waitForSelector("._7b8eu");
}
