
const test = (browser, url) => {
  browser
    .url(url)
    .waitForElementVisible('body', 500)
    .pause(300)
    .click('#button')
    .pause(100)
    .assert.containsText('#button', 'true')
    .click('#button')
    .pause(100)
    .assert.containsText('#button', 'false')
    .end();
}

module.exports = {
  ['class component'] (browser) {
    test(browser, 'localhost:8000/test/e2e/spec/basic.class-component.html');
  },

  ['object literal'] (browser) {
    test(browser, 'localhost:8000/test/e2e/spec/basic.object-literal.html');
  },
};
