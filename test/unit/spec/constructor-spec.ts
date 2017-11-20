import VueSub from 'src/vue-sub'

describe('VueSub', function (): void {
  const instance: VueSub = new VueSub();

  it('static property `installed` should be `boolean`', function (): void {
    expect(typeof VueSub.installed).toBe('boolean')
  })

  it('static method `install` should be `function`', function (): void {
    expect(typeof VueSub.install).toBe('function')
  })

  it('property `observers` should be `object`', function (): void {
    expect(typeof instance.observers).toBe('object')
  })

  it('method `subscribe` should be `function`', function (): void {
    expect(typeof instance.subscribe).toBe('function')
  })

  it('method `unsubscribe` should be `function`', function (): void {
    expect(typeof instance.unsubscribe).toBe('function')
  })

  it('method `once` should be `function`', function (): void {
    expect(typeof instance.once).toBe('function')
  })

  it('method `fire` should be `function`', function (): void {
    expect(typeof instance.fire).toBe('function')
  })
})
