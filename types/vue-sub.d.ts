import { PluginFunction } from 'vue';
import { ActionType, VueSubOptions, Observers, Handler } from './options';

export interface VueSub {
  observers: Observers;

  subscribe (action: ActionType, handler: Handler): boolean;
  unsubscribe (action: ActionType, handler: Handler): boolean;
  once (action: ActionType, handler: Handler): boolean;
  fire (action: ActionType, params?: any): boolean;
}

export interface VueSubConstructor<VS extends VueSub = VueSub> {
  new (options?: VueSubOptions): any;

  installed: boolean;
  install: PluginFunction<never>;
}

export const VueSub: VueSubConstructor;
