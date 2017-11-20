import VueSub from 'lib/constructor';

describe('VueSub', function () {
  const instance = new VueSub();

  it('typeof static property `installed` should be `boolean`', function () {
    expect(typeof VueSub.installed).toBe('boolean');
  });

  it('typeof static method `install` should be `function`', function () {
    expect(typeof VueSub.install).toBe('function');
  });

  it('typeof instance prooperty `observers` should be `object`', function () {
    expect(typeof instance.observers).toBe('object');
  });

  it('typeof instance method `subscribe` should be `function`', function () {
    expect(typeof instance.subscribe).toBe('function');
  });

  it('typeof instance method `unsubscribe` should be `function`', function () {
    expect(typeof instance.unsubscribe).toBe('function');
  });

  it('typeof instance method `once` should be `function`', function () {
    expect(typeof instance.once).toBe('function');
  });

  it('typeof instance method `fire` should be `function`', function () {
    expect(typeof instance.fire).toBe('function');
  });

  it('typeof instance method `setObservers` should be `function`', function () {
    expect(typeof instance.setObservers).toBe('function');
  });
});
