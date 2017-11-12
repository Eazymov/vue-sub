import { createDecorator } from 'vue-class-component';
const addSubscriber = (action, once) => {
    return createDecorator((target, property) => {
        const purpose = once ? 'once' : 'subscribe';
        const created = target.created;
        const subscriber = function () {
            this.$observable[purpose](action, this[property]);
        };
        if (!created) {
            target.created = subscriber;
        }
        else if (created.length) {
            target.created.push(subscriber);
        }
        else {
            target.created = [subscriber, created];
        }
    });
};
const Subscribe = (action) => {
    return addSubscriber(action, false);
};
const Once = (action) => {
    return addSubscriber(action, true);
};
const Action = (action) => {
    return createDecorator((component, property) => {
        const methods = component.methods || {};
        methods[property] = function (params) {
            this.$observable.fire(action, params);
        };
    });
};
export { Subscribe, Once, Action, };
