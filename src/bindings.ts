import { forEach } from './utils';

function createDecorator (object: any, factory: AnyFunc): any {
  const constructor: any = object.constructor;
  constructor.__decorators__ = constructor.__decorators__ || [];
  constructor.__decorators__.push(factory);
}

function addSubscriber (subscriber: Subscriber): AnyFunc {
  return function(object: any, prop: string, descriptor: any): void {
    console.log(object, prop, descriptor);
    return createDecorator(object, (component: any) => {
      const methods: Methods = component.methods;
      const getSubscribers: () => Subscribers = methods.getSubscribers;
      const subscribers: Subscribers = getSubscribers ? getSubscribers() : {};
    
      methods.getSubscribers = (): Subscribers => ({
        ...subscribers,
        [prop]: subscriber,
      });
    });
  }
}

function Action (actionType: any): any {
  return (object: any, prop: string, descriptor: any) => {
    createDecorator(object, (component: any): void => {
      component.methods[prop] = function (params?: any) {
        this.$observable.fire(actionType, params); 
      };
    });

    return {
      value: function() {},
    };
  }
}

function Subscribe (action: string): AnyFunc {
  return addSubscriber({
    once: false,
    action,
  });
}

function Once (action: string): AnyFunc {
  return addSubscriber({
    once: true,
    action,
  });
}

function bindSubscribers (component: any): boolean {
  if (typeof component.getSubscribers !== 'function') return false; 
  
  const subscribers: Subscribers = component.getSubscribers();
  const $observable: any = component.$observable;
  const methods: string[] = Object.keys(subscribers);
  
  forEach(methods, (method: string) => {
    const { once, action } = subscribers[method];
    const which: string = once ? 'once' : 'subscribe';

    $observable[which](action, component[method]);
  });

  return delete component.getSubscribers;
}

export {
  Action,
  Subscribe,
  Once,
  bindSubscribers,
};
