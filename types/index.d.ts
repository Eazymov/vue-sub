declare module 'vue-sub';

import { PluginFunction } from 'vue';

type Handler = (...args: any[]) => any;

interface Observers {
  [key: string]: Handler[];
}

type Subscribe = (action: string, ...handlers: Handler[]) => boolean;
type Unsubscribe = (action: string, ...handlers: Handler[]) => boolean;
type Once = (action: string, handler: Handler[]) => boolean;
type Fire = (action: string, params?: any) => boolean;

interface VueSubOptions {
  observers: Observers;
}

export default class VueSub {
  constructor (options?: VueSubOptions);

  static installed: boolean;
  static install: PluginFunction<never>;

  public observers: Observers;
  public subscribe: Subscribe;
  public unsubscribe: Unsubscribe;
  public once: Once;
  public fire: Fire;

  private removeHandler: (action: string, handler: Handler) => boolean;
}

