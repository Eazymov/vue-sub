import { isObject, forEach, filter, isValidObservers } from './utils';
import { bindSubscribers } from './bindings';

/**
 * Private
 */
function removeHandler (action, handler) {
  const observers = this.observers;
  const actionHandlers = observers[action];
  const index = actionHandlers.indexOf(handler);
  
  observers[action].splice(index, 1);

  return true;
}

function setObservers (observers) {
  if (observers === undefined) {
    return (this.observers = {});
  }

  if (isValidObservers(observers)) {
    this.observers = observers;
  } else {
    throw new TypeError('Observers is invalid');
  }
}

class VueSub {
  constructor (props = {}) {
    if (!isObject(props)) {
      throw new TypeError('VueSub constructor props is invalid');
    }

    const observers = props.observers;

    setObservers.call(this, observers);
  }

  /**
   * Public
   */
  subscribe (action, ...newHandlers) {
    const observers = this.observers;

    if (!observers[action]) {
      observers[action] = [];
    }

    forEach(newHandlers, (handler) => {
      if (typeof handler !== 'function') {
        throw new TypeError('Provided handler is not a function');
      }
      
      if (observers[action].indexOf(handler) === -1) {
        observers[action].push(handler);
      }
    });
    
    return true;
  }

  unsubscribe (action, ...handlers) {
    const observers = this.observers;
    const actionHandlers = observers[action];

    if (actionHandlers === undefined) return false;

    observers[action] = filter(
      actionHandlers,
      (handler) => handlers.indexOf(handler) === -1
    );

    return true;
  }
  
  once (action, handler) {
    return this.subscribe(action, (params) => {
      handler(params);
      
      return removeHandler.call(this, action, handler);
    });
  }

  fire (action, params) {
    const actionHandlers = this.observers[action];

    if (!actionHandlers) return false;

    forEach(
      actionHandlers,
      (handler) => handler(params)
    );

    return true;
  }
}

/**
 * Static
 */
VueSub.installed = false;
  
VueSub.install = function (Vue) {
  if (VueSub.installed) return;

  Vue.prototype.VueSub = this;

  Vue.mixin({
    beforeCreate () {
      const options = this.$options;

      if (options.observable) {
        this.$observable = options.observable;
      } else if (options.parent && options.parent.$observable) {
        this.$observable = options.parent.$observable;
      }
    },
    created () {
      bindSubscribers(this);
    },
  });
}

export default VueSub;
