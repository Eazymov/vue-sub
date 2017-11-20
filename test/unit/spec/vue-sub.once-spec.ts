import VueSub from 'src/vue-sub';

describe('VueSub.once', function (): void {

  const ACTION: string = 'LOG';
  const observable: VueSub = new VueSub();
  const handler: Function = function (): number {
    return 1 + 1;
  }
  let logHandlers: Array<Function>;

  observable.once(ACTION, handler);

  it('handler should exist', function (): void {
    logHandlers = observable.observers[ACTION];

    expect(logHandlers.length).toBe(1);
  });

  it('handler should have been called', function (): void {
    expect(observable.fire(ACTION)).toBeTruthy();
  });

  it('handler should be deleted', function (): void {
    logHandlers = observable.observers[ACTION];

    expect(logHandlers.length).toBe(0);
  });
});
