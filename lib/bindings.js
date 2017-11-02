import { createDecorator } from 'vue-class-component';
import { forEach } from './utils';
const addSubscriber = (subscriber) => {
    return createDecorator((target, prop) => {
        const methods = target.methods;
        const getSubscribers = methods.getSubscribers;
        const subscribers = getSubscribers ? getSubscribers() : {};
        subscribers[prop] = subscriber;
        methods.getSubscribers = () => subscribers;
    });
};
const Subscribe = (action) => {
    return addSubscriber({
        once: false,
        action,
    });
};
const Once = (action) => {
    return addSubscriber({
        once: true,
        action,
    });
};
const Action = (action) => (target, prop, descriptor = {}) => {
    delete descriptor.initializer;
    descriptor.value = function () { };
    createDecorator((component) => {
        component.methods[prop] = function (params) {
            this.$observable.fire(action, params);
        };
    })(target, prop);
};
const bindSubscribers = (component) => {
    if (typeof component.getSubscribers !== 'function')
        return false;
    const subscribers = component.getSubscribers();
    const $observable = component.$observable;
    const methods = Object.keys(subscribers);
    forEach(methods, (method) => {
        const { once, action } = subscribers[method];
        const which = once ? 'once' : 'subscribe';
        $observable[which](action, component[method]);
    });
    return delete component.getSubscribers;
};
export { Subscribe, Once, Action, bindSubscribers, };
