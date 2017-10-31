import { PluginFunction } from 'vue';

export default class VueSub {
  constructor (options?: VueSubOptions);

  static installed: boolean;
  static install: PluginFunction<never>;

  public observers: Observers;

  public subscribe (action: string, ...handlers: Handler[]): boolean;
  public unsubscribe (action: string, ...handlers: Handler[]): boolean;
  public once (action: string, handler: Handler): boolean;
  public fire (action: string, params?: any): boolean;

  private removeHandler (action: string, handler: Handler): boolean;
}
