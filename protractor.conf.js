// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts


// Browserstack local connection.
var browserstack = require('browserstack-local');

exports.config = {
    allScriptsTimeout: 11000,
    seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
    /*
     * Browser capabilities.  By default, let's just do a Windows/Chrome test.
     * This section can be expanded to include all browser/os combinations in
     * the browser stack library, but only 5 at a time will be tested in parallel.
     *
     * @see https://www.browserstack.com/automate/protractor
     */
    capabilities: {
        'browserstack.user': 'michaelmorris5',
        'browserstack.key': 'CnK3B8wAxF4xpsu54xJc',
        'browserstack.local': true,
        browserName: 'chrome'
    },
    specs: ['features/*.feature'],
    baseUrl: 'http://localhost:4200/',
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {require: ['features/step_definitions/stepDefinitions.js']},

    /*
     * Before Launch Actions
     *
     * Start the BrowserStack SSH tunnel so its servers can see localhost.
     */
    beforeLaunch: function () {
        return new Promise(function (resolve, reject) {
            exports.bs_local = new browserstack.Local();
            exports.bs_local.start({key: exports.config.capabilities['browserstack.key']}, function (error) {
                if (error) {
                    return reject(error);
                }
                console.log('Connected. Now testing...');
                resolve();
            });
        });
    },
    /**
     * After Launch actions
     *
     * Shutdown Browserstack Selenium server
     */
    afterLaunch: function () {
        return new Promise(function (resolve) {
            exports.bs_local.stop(resolve);
        });
    }
};
