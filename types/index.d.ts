declare module 'vue-sub';

declare type Handler = (...args: any[]) => any;

declare type Subscribe = (action: string, ...handlers: Handler[]) => boolean;
declare type Unsubscribe = (action: string, ...handlers: Handler[]) => boolean;
declare type Once = (action: string, handler: Handler[]) => boolean;
declare type Fire = (action: string, params?: any) => boolean;

declare interface Observers {
  [key: string]: Handler[];
}

declare interface VueSub {
  observers: Observers;
  subscribe: Subscribe;
  unsubscribe: Unsubscribe;
  once: Once;
  fire: Fire;
}

declare type AnyFunc = (...args: any[]) => void;
declare interface Subscribers {
  [key: string]: {
    once: boolean;
    action: string;
  };
}
declare interface Methods {
  getSubscribers: () => Subscribers;
  [key: string]: AnyFunc;
}
