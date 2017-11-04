import { createDecorator } from 'vue-class-component';
const addSubscriber = (subscriber) => {
    return createDecorator((target, prop) => {
        const methods = target.methods || {};
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
const Action = (action) => {
    return createDecorator((component, prop) => {
        const methods = component.methods || {};
        methods[prop] = function (params) {
            this.$observable.fire(action, params);
        };
    });
};
export { Subscribe, Once, Action, };
