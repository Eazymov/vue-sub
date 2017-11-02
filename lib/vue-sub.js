import VueSub from './constructor';
export { Action, Subscribe, Once } from './bindings';
if (window) {
    window.VueSub = VueSub;
    if (window.Vue) {
        window.Vue.use(VueSub);
    }
}
