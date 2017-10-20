import VueSub from './vue-sub';
export { Action, Subscribe, Once } from './bindings';

if (window) {
 (<any>window).VueSub = VueSub;

 if ((<any>window).Vue) {
   (<any>window).Vue.use(VueSub);
 }
}

export default VueSub;
