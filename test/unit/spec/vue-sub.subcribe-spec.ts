import VueSub from 'src/vue-sub';

describe('VueSub.subscribe', function (): void {

  const ACTION: string = 'ACTION';
  const observable: VueSub = new VueSub();
  const handler: Function = function (): number {
    return 1 + 1;
  }

  observable.subscribe(ACTION, handler);

  const logHandlers: Array<Function> = observable.observers[ACTION];

  it('handler should exist', function (): void {
    expect(logHandlers.length).toBe(1);
  });

  it('handler should have been called', function (): void {
    expect(observable.fire(ACTION)).toBeTruthy();
  });
});
