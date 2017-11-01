import VueSub from './vue-sub';
export { Action, Subscribe, Once } from './bindings';

const subscribers = new VueSub();

export default subscribers;
