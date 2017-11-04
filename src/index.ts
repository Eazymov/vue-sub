import Vue from 'vue';
import VueSub from './constructor';

declare global {
  interface Window {
    Vue: typeof Vue;
    VueSub: typeof VueSub;
  }
}

if (window) {
  window.VueSub = VueSub;

  if (window.Vue) {
    window.Vue.use(VueSub);
  }
}
