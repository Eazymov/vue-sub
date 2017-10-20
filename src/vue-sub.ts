import { forEach, bindSubscribers } from './bindings';

class VueSub {
  
  public observers: Observers = {};

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

    observers[action] = actionHandlers.filter(
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
  
  private removeHandler (action: string, handler: Handler): boolean {
    const actionHandlers: Handler[] = this.observers[action];
    const index: number = actionHandlers.indexOf(handler);
    
    this.observers[action].splice(index, 1);

    return true;
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

  static install (Vue: any) {
    Vue.prototype.VueSub = this;

    Vue.mixin({
      beforeCreate (): void {
        const options: any = this.$options;

        if (options.subscriber) {
          this.$subscriber = options.subscriber;
        } else if (options.parent && options.parent.$subscriber) {
          this.$subscriber = options.parent.$subscriber;
        }
      },
      created (): void {
        bindSubscribers(this);
      }
    });
  }
}

export default VueSub;
