var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
//var webdriver = require('selenium-webdriver');

var {Then, When, Given} = require('cucumber');

Given('I am on the homepage', function (callback) {
  browser.get('/').then(callback);
});

Then('I should see {stringInDoubleQuotes}', function (stringInDoubleQuotes, callback) {
  expect(browser.getPageSource()).to.eventually.include(stringInDoubleQuotes).and.notify(callback);
});

