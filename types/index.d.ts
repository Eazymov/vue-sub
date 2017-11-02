import './vue';
import VueSub from './vue-sub';
import { Action, Subscribe, Once } from './decorators';

export {
  ActionType,
  Handler,
  Observers,
  Subscriber,
  Subscribers,
  Methods,
  VueSubOptions,
} from './options';

export const Action: Action;
export const Subscribe: Subscribe;
export const Once: Once;

export default VueSub;
