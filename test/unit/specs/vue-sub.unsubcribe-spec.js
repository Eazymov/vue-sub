import VueSub from 'package';

describe('VueSub.unsubscribe', function () {

  const ACTION = 'LOG';
  const observable = new VueSub();
  const handler = function () {
    return 1 + 1;
  }
  let logHandlers;

  observable.subscribe(ACTION, handler);

  it('handler should exist', function () {
    logHandlers = observable.observers[ACTION];

    expect(logHandlers.length).toBe(1);
  });

  it('handler should have been unsubcribed', function () {
    expect(observable.unsubscribe(ACTION, handler)).toBeTruthy();
  });

  it('handler should not exist', function () {
    logHandlers = observable.observers[ACTION];

    expect(logHandlers.length).toBe(0);
  });
});
