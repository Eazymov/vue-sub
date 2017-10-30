import { createDecorator } from 'vue-class-component';
import { forEach } from './utils';
const addSubscriber = (subscriber) => {
    return createDecorator((object, prop) => {
        const methods = object.methods;
        const getSubscribers = methods.getSubscribers;
        const subscribers = getSubscribers ? getSubscribers() : {};
        subscribers[prop] = subscriber;
        methods.getSubscribers = () => subscribers;
    });
};
export const Subscribe = (action) => {
    return addSubscriber({
        once: false,
        action,
    });
};
export const Once = (action) => {
    return addSubscriber({
        once: true,
        action,
    });
};
export const Action = (actionType) => {
    return (object, prop, descriptor) => {
        createDecorator((component) => {
            component.methods[prop] = function (params) {
                this.$observable.fire(actionType, params);
            };
        })(object, prop, descriptor);
        return {
            value: function () { },
        };
    };
};
export const bindSubscribers = (component) => {
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
