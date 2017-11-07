import VueSub from 'package';

describe('VueSub.subscribe', function () {

  const ACTION = 'ACTION';
  const observable = new VueSub();
  const handler = function () {
    return 1 + 1;
  }

  observable.subscribe(ACTION, handler);

  const logHandlers = observable.observers[ACTION];

  it('handler should exist', function () {
    expect(logHandlers.length).toBe(1);
  });

  it('handler should have been called', function () {
    expect(observable.fire(ACTION)).toBeTruthy();
  });
});
