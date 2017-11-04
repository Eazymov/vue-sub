import Vue from 'vue';
import { createDecorator } from 'vue-class-component';
import {
  ActionType,
  Subscriber,
  Methods,
  Subscribers,
} from 'types';

const addSubscriber = (subscriber: Subscriber) => {
  return createDecorator((target, prop: string): void => {
    const methods: Methods = target.methods || {};
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

const Action = (action: ActionType) => {
  return createDecorator((component, prop: string): void => {
    const methods: Methods = component.methods || {};

    methods[prop] = function (this: Vue, params: any) {
      this.$observable.fire(action, params);
    };
  });
}

export {
  Subscribe,
  Once,
  Action,
};
