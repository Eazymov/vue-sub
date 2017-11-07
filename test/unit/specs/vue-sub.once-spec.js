import VueSub from 'package';

describe('VueSub.once', function () {

  const ACTION = 'LOG';
  const observable = new VueSub();
  const handler = function () {
    return 1 + 1;
  }
  let logHandlers;

  observable.once(ACTION, handler);

  it('handler should exist', function () {
    logHandlers = observable.observers[ACTION];

    expect(logHandlers.length).toBe(1);
  });

  it('handler should have been called', function () {
    expect(observable.fire(ACTION)).toBeTruthy();
  });

  it('handler should be deleted', function () {
    logHandlers = observable.observers[ACTION];

    expect(logHandlers.length).toBe(0);
  });
});
