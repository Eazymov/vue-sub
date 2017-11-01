import Vue from 'vue';
import VueSub, { Action, Subscribe, Once } from '../src/vue-sub';
import '../types/vue';

const actions = {
  LOG: 'LOG',
  ERROR: 'ERROR',
};

Vue.use(VueSub);

const observable = new VueSub({
  observers: {
    [actions.LOG]: [
      console.log,
    ],
  }
});

const app = new Vue({
  router,
})

class Test {
  @Action(actions.ERROR)
  public errorHandler: (...args: any[]) => any;
}

const test = new Test();

test.errorHandler();
