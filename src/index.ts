import Vue from 'vue';
import VueSub from './constructor';
import { Action, Subscribe, Once } from './bindings';

declare global {
  interface Window {
    Vue: typeof Vue;
    VueSub: typeof VueSub;
    Action: typeof Action;
    Subscribe: typeof Subscribe;
    Once: typeof Once;
  }
}

if (window) {
  window.VueSub = VueSub;
  window.Action = Action;
  window.Subscribe = Subscribe;
  window.Once = Once;

  if (window.Vue) {
    window.Vue.use(VueSub);
  }
}
