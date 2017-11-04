import VueSub from './constructor';
if (window) {
    window.VueSub = VueSub;
    if (window.Vue) {
        window.Vue.use(VueSub);
    }
}
