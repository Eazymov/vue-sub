function forEach (array: any[], handler: AnyFunc): void {
  for (let i = 0; i < array.length; i++) {
    handler(array[i], i);
  }
}

function createDecorator (component: any, func: AnyFunc): void {
  const constructor: any = component.constructor;

  if (!component.VueSub) {
    throw new Error('Vue-sub is not installed');
  }

  if (!constructor.__decorators__) {
    constructor.__decorators__ = [];
  }

  constructor.__decorators__.push(func);
}

function bindActionToComponent (component: any, actionType: string, method: string) {
  return createDecorator(component, (component: any): void => {
    component.methods[method] = function (params?: any) {
      this.$subscriber.fire(actionType, params); 
    };
  });
}

function Action (actionType: any): any {
  return function(component: any, method: string) {
    bindActionToComponent(component, actionType, method);
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

function Once () {

}

function bindSubscribers (component: any): boolean {
  if (typeof component.getSubscribers !== 'function') return false; 
  
  const subscribers: AnyFunc[] = component.getSubscribers();
  const $subscriber: any = component.$subscriber;
  const keys: string[] = Object.keys(subscribers);
  
  forEach(keys, (key: string) => {
    $subscriber.subscribe(subscribers[key], component[key]);
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
