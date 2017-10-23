import { forEach } from './utils';

function createDecorator (component: any, func: AnyFunc): void {
  const constructor: any = component.constructor;
  constructor.__decorators__ = constructor.__decorators__ || [];
  constructor.__decorators__.push(func);
}

function addSubscriber (subscriber: Subscriber): AnyFunc {
  return function(component: any, method: string): void {
    return createDecorator(component, (component: any) => {
      const methods: Methods = component.methods;
      const getSubscribers: () => Subscribers = methods.getSubscribers;
      const subscribers: Subscribers = getSubscribers ? getSubscribers() : {};
    
      methods.getSubscribers = (): Subscribers => ({
        ...subscribers,
        [method]: subscriber,
      });
    });
  }
}

function Action (actionType: any): any {
  return (component: any, method: string) => {
    return createDecorator(component, (component: any): void => {
      component.methods[method] = function (params?: any) {
        this.$observable.fire(actionType, params); 
      };
    });
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
