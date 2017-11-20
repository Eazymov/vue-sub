import Vue from 'vue';
import { createDecorator } from 'vue-class-component';
import { ActionType, Methods } from 'types';

const addSubscriber = (action: ActionType, once: boolean) => {
  return createDecorator((target: any, property: PropertyKey): void => {
    const purpose: string = once ? 'once' : 'subscribe';
    const created: Function = target.created;
    const subscriber: Function = function (this: Vue) {
      this.$observable[purpose](action, this[property]);
    }
    
    if (!created) {
      target.created = subscriber;
    } else if (created.length) {
      target.created.push(subscriber);
    } else {
      target.created = [subscriber, created];
    }
  });
}

const Subscribe = (action: ActionType) => {
  return addSubscriber(action, false);
}

const Once = (action: ActionType) => {
  return addSubscriber(action, true);
}

const Action = (action: ActionType) => {
  return createDecorator((component, property: PropertyKey): void => {
    const methods: Methods = component.methods || {};

    methods[property] = function (this: Vue, params: any) {
      this.$observable.fire(action, params);
    };
  });
}

export {
  Subscribe,
  Once,
  Action,
};
