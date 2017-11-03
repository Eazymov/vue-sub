
module.exports = {
  ['class component'] (browser) {
    browser
      .url('localhost:8080/test/e2e/specs/class-component.html')
      .end();
  },
};
