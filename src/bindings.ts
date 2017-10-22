function forEach (array: any[], handler: AnyFunc): void {
  for (let i = 0; i < array.length; i++) {
    handler(array[i], i);
  }
}

function createDecorator (component: any, func: AnyFunc): void {
  const constructor: any = component.constructor;

  constructor.__decorators__ = constructor.__decorators__ || [];

  constructor.__decorators__.push(func);
}

function Action (actionType: any): any {
  return (component: any, method: string) => {
    return createDecorator(component, (component: any): void => {
      component.methods[method] = function (params?: any) {
        this.$subscriber.fire(actionType, params); 
      };
    });
  }
}

function Subscribe (action: string): AnyFunc {
  return function(component: any, method: string): void {
    return createDecorator(component, (component: any) => {
      const methods: Methods = component.methods;
      const getSubscribers: () => Subscribers = methods.getSubscribers;
      let existingSubscribers: Subscribers = {};

      if (getSubscribers) {
        existingSubscribers = getSubscribers();
      }

      methods.getSubscribers = (): Subscribers => {
        return {
          ...existingSubscribers,
          [method]: { once: false, action },
        };
      }
    });
  }
}

function Once (action: string): AnyFunc {
  return function(component: any, method: string): void {
    return createDecorator(component, (component: any) => {
      const methods: Methods = component.methods;
      const getSubscribers: () => Subscribers = methods.getSubscribers;
      let existingSubscribers: Subscribers = {};

      if (getSubscribers) {
        existingSubscribers = getSubscribers();
      }

      methods.getSubscribers = (): Subscribers => {
        return {
          ...existingSubscribers,
          [method]: { once: true, action },
        };
      }
    });
  }
}

function bindSubscribers (component: any): boolean {
  if (typeof component.getSubscribers !== 'function') return false; 
  
  const subscribers: AnyFunc[] = component.getSubscribers();
  const $subscriber: any = component.$subscriber;
  const keys: string[] = Object.keys(subscribers);
  
  forEach(keys, (key: string) => {
    const { once, action } = subscribers[key];
    const which: string = once ? 'once' : 'subscribe';

    $subscriber[which](action, component[key]);
  });

  return delete component.getSubscribers;
}

export {
  forEach,
  Action,
  Subscribe,
  Once,
  bindSubscribers,
};
