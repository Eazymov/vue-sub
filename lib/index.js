import VueSub from './constructor';
import { Action, Subscribe, Once } from './bindings';
if (window) {
    window.VueSub = VueSub;
    window.Action = Action;
    window.Subscribe = Subscribe;
    window.Once = Once;
    if (window.Vue) {
        window.Vue.use(VueSub);
    }
}
