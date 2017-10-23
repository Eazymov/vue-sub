import { isObject, forEach, filter, isValidObservers } from './utils';
import { bindSubscribers } from './bindings';

class VueSub {
  /**
   * Static
   */
  static installed: boolean = false;

  static install (Vue: any): void {
    if (VueSub.installed) return;

    Vue.prototype.VueSub = this;

    Vue.mixin({
      beforeCreate (): void {
        const options: any = this.$options;

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
   * Public
   */
  public observers: Observers = {};

  public constructor (props: any) {
    if (props === undefined) return;

    if (!isObject(props)) {
      throw new TypeError('VueSub constructor props is invalid');
    }

    const observers: Observers = props.observers;

    if (observers === undefined) return;

    if (isValidObservers(observers)) {
      this.observers = observers;
    } else {
      throw new TypeError('Observers is invalid');
    }
  }

  public subscribe (action: string, ...newHandlers: Handler[]): boolean {
    const observers: Observers = this.observers;

    if (!observers[action]) {
      observers[action] = [];
    }

    forEach(newHandlers, (handler: Handler) => {
      if (typeof handler !== 'function') {
        throw new TypeError('Provided handler is not a function');
      }
      
      if (observers[action].indexOf(handler) === -1) {
        observers[action].push(handler);
      }
    });
    
    return true;
  }

  public unsubscribe (action: string, ...handlers: Handler[]): boolean {
    const observers: Observers = this.observers;
    const actionHandlers: Handler[] = observers[action];

    if (actionHandlers === undefined) return false;

    observers[action] = filter(
      actionHandlers,
      (handler: Handler) => handlers.indexOf(handler) === -1
    );

    return true;
  }
  
  public once (action: string, handler: Handler): boolean {
    return this.subscribe(action, (params?: any): boolean => {
      handler(params);
      
      return this.removeHandler(action, handler);
    });
  }

  public fire (action: string, params?: any): boolean {
    const actionHandlers: Handler[] = this.observers[action];

    if (!actionHandlers) return false;

    forEach(
      actionHandlers,
      (handler: Handler) => handler(params)
    );

    return true;
  }
  
  /**
   * Private
   */
  private removeHandler (action: string, handler: Handler): boolean {
    const actionHandlers: Handler[] = this.observers[action];
    const index: number = actionHandlers.indexOf(handler);
    
    this.observers[action].splice(index, 1);

    return true;
  }
}

export default VueSub;
