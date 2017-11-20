import VueSub from 'src/vue-sub';

describe('VueSub.unsubscribe', function (): void {

  const ACTION = 'LOG';
  const observable: VueSub = new VueSub();
  const handler: Function = function (): number {
    return 1 + 1;
  }
  let logHandlers: Array<Function>;

  observable.subscribe(ACTION, handler);

  it('handler should exist', function (): void {
    logHandlers = observable.observers[ACTION];

    expect(logHandlers.length).toBe(1);
  });

  it('handler should have been unsubcribed', function (): void {
    expect(observable.unsubscribe(ACTION, handler)).toBeTruthy();
  });

  it('handler should not exist', function (): void {
    logHandlers = observable.observers[ACTION];

    expect(logHandlers.length).toBe(0);
  });
});
