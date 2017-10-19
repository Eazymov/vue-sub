
function createDecorator (component: any, func: any): void {
  const constructor: any = component.constructor;

  if (!component.VueSub) {
    throw new Error('Vue-sub is not installed');
  }

  if (!constructor.__decorators__) {
    constructor.__decorators__ = [];
  }

  constructor.__decorators__.push(func);
}

function bindActionToComponent (component: any, action: string, method: string) {
  return createDecorator(component, (component: any): void => {
    component.methods[method] = function (params: any) {
      this.$subscriber.fire(action, params); 
    };
  });
}

function Action (a: any): any {
  return function(target: any, fnName: string) {
    bindActionToComponent(target, a, fnName);
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
          [method]: action,
        };
      }
    });
  }
}

function bindSubscribers (component: any): boolean {
  if (typeof component.getSubscribers !== 'function') return false; 
  
  const subscribers: AnyFunc[] = component.getSubscribers();
  const $subscriber: any = component.$subscriber;
  
  Object
    .keys(subscribers)
    .forEach((key: string) => {
      const handler: AnyFunc = component[key];

      $subscriber.subscribe(subscribers[key], handler);
    });

  return delete component.getSubscribers;
}

export {
  Action,
  Subscribe,
  bindSubscribers,
};
