import { isObject, forEach, isValidObservers } from './utils';
class VueSub {
    /**
     * Public methods
     */
    constructor(props = {}) {
        /**
         * Public properties
         */
        this.observers = {};
        if (!isObject(props)) {
            throw new TypeError('VueSub constructor props is invalid');
        }
        const observers = props.observers || {};
        this.setObservers(observers);
    }
    static install(vm) {
        if (VueSub.installed)
            return;
        vm.mixin({
            beforeCreate() {
                const options = this.$options;
                if (options.observable) {
                    this.$observable = options.observable;
                }
                else if (options.parent && options.parent.$observable) {
                    this.$observable = options.parent.$observable;
                }
            },
        });
    }
    subscribe(action, handler) {
        const observers = this.observers;
        if (!observers[action]) {
            observers[action] = [];
        }
        if (typeof handler !== 'function') {
            throw new TypeError('Provided handler is not a function');
        }
        if (observers[action].indexOf(handler) !== -1)
            return false;
        observers[action].push(handler);
        return true;
    }
    unsubscribe(action, handler) {
        const observers = this.observers;
        const actionHandlers = observers[action];
        if (actionHandlers === undefined)
            return false;
        const index = actionHandlers.indexOf(handler);
        if (index === -1)
            return false;
        observers[action].splice(index, 1);
        return true;
    }
    once(action, handler) {
        const selfDestroying = (params) => {
            handler(params);
            return this.unsubscribe(action, selfDestroying);
        };
        return this.subscribe(action, selfDestroying);
    }
    fire(action, params) {
        const actionHandlers = this.observers[action];
        if (!actionHandlers)
            return false;
        forEach(actionHandlers, (handler) => handler(params));
        return true;
    }
    /**
     * Private methods
     */
    setObservers(observers) {
        if (isValidObservers(observers)) {
            this.observers = observers;
        }
        else {
            throw new TypeError('Observers is invalid');
        }
    }
}
/**
 * Public static methods
 */
VueSub.installed = false;
export default VueSub;
