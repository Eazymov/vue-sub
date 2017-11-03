import Vue from 'vue';
import VueSub from './constructor';
import { createDecorator } from 'vue-class-component';
import { forEach } from './utils';
import {
  ActionType,
  Subscriber,
  Methods,
  Subscribers,
} from 'types';

const addSubscriber = (subscriber: Subscriber) => {
  return createDecorator((target, prop: string): void => {
    const methods: Methods = target.methods;
    const getSubscribers: () => Subscribers = methods.getSubscribers;
    const subscribers: Subscribers = getSubscribers ? getSubscribers() : {};

    subscribers[prop] = subscriber;
  
    methods.getSubscribers = () => subscribers;
  });
}

const Subscribe = (action: ActionType) => {
  return addSubscriber({
    once: false,
    action,
  });
}

const Once = (action: ActionType) => {
  return addSubscriber({
    once: true,
    action,
  });
}

const Action = (action: ActionType) => (
  target: Vue,
  prop: string,
  descriptor: PropertyDescriptor = {},
): void => {
  delete descriptor.initializer;
  descriptor.value = function () {};

  createDecorator((component) => {
    component.methods[prop] = function (params: any) {
      this.$observable.fire(action, params); 
    };
  })(target, prop);
}

const bindSubscribers = (component: any): boolean => {
  if (typeof component.getSubscribers !== 'function') return false; 
  
  const subscribers: Subscribers = component.getSubscribers();
  const $observable: VueSub = component.$observable;
  const methods: Array<string> = Object.keys(subscribers);
  
  forEach(methods, (method: string) => {
    const { once, action }: Subscriber = subscribers[method];
    const which: string = once ? 'once' : 'subscribe';

    $observable[which](action, component[method]);
  });

  return delete component.getSubscribers;
}

export {
  Subscribe,
  Once,
  Action,
  bindSubscribers,
};
