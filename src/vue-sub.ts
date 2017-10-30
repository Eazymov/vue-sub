import Vue from 'vue';
import VueSub from './constructor';
export { Action, Subscribe, Once } from './bindings';

declare global {
  interface Window {
    Vue: Vue;
    VueSub: VueSub;
  }
}

if (window) {
 window.VueSub = VueSub;

 if (window.Vue) {
   window.Vue.use(VueSub);
 }
}

export default VueSub;
