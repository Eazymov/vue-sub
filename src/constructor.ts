import Vue, { ComponentOptions } from 'vue';
import {
  isObject,
  forEach,
  isValidObservers,
  bindSubscribers
} from './utils';
import { ActionType, VueSubOptions, Observers, Handler, } from 'types';

class VueSub {
  /**
   * Public static methods
   */

  public static installed = false;
    
  public static install (vm: typeof Vue) {
    if (VueSub.installed) return;
  
    vm.mixin({
      beforeCreate (): void {
        const options: ComponentOptions<Vue> = this.$options;
  
        if (options.observable) {
          this.$observable = options.observable;
        } else if (options.parent && options.parent.$observable) {
          this.$observable = options.parent.$observable;
        }
      },
      created (): void {
        bindSubscribers(this);
      },
    });
  }

  /**
   * Public properties
   */

  public observers: Observers = {};

  /**
   * Public methods
   */

  public constructor (props: VueSubOptions = {}) {
    if (!isObject(props)) {
      throw new TypeError('VueSub constructor props is invalid');
    }

    const observers: Observers = props.observers || {};

    this.setObservers(observers);
  }

  public subscribe (action: ActionType, handler: Handler): boolean {
    const observers: Observers = this.observers;

    if (!observers[action]) {
      observers[action] = [];
    }

    if (typeof handler !== 'function') {
      throw new TypeError('Provided handler is not a function');
    }
    
    if (observers[action].indexOf(handler) !== -1) return false;

    observers[action].push(handler);
    
    return true;
  }

  public unsubscribe (action: ActionType, handler: Handler): boolean {
    const observers: Observers = this.observers;
    const actionHandlers: Handler[] = observers[action];

    if (actionHandlers === undefined) return false;

    const index: number = actionHandlers.indexOf(handler);

    if (index === -1) return false;

    observers[action].splice(index, 1);

    return true;
  }
  
  public once (action: ActionType, handler: Handler): boolean {
    const selfDestroying = (params: any): boolean => {
      handler(params);
      
      return this.unsubscribe(action, selfDestroying);
    }

    return this.subscribe(action, selfDestroying);
  }

  public fire (action: ActionType, params: any): boolean {
    const actionHandlers: Handler[] = this.observers[action];

    if (!actionHandlers) return false;

    forEach(
      actionHandlers,
      (handler: Handler) => handler(params)
    );

    return true;
  }

  /**
   * Private methods
   */

  private setObservers (observers: Observers): void {
    if (isValidObservers(observers)) {
      this.observers = observers;
    } else {
      throw new TypeError('Observers is invalid');
    }
  }
}

export default VueSub;
