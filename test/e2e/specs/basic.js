
module.exports = {
  ['basic'] (browser) {
    browser
      .url('localhost:8000/test/e2e/specs/basic.html')
      .pause(1000)
      .click('#button')
      .pause(100)
      .assert.containsText('#button', 'Clicked')
      .end();
  },
};
