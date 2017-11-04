import Vue, { Component } from 'vue';
import VueSub, { Action, Subscribe, Once } from 'project';

const actions = {
  LOG: 'LOG',
  ERROR: 'ERROR',
};

Vue.use(VueSub);

/**
 * Creating vue component instance via `object literal`
 */

const component: Component = {
  methods: {
    raiseError(err: Error) {
      this.$observable.fire(actions.ERROR, err);
    },

    handleLog(...args: any[]): void {
      console.log(args);
    },

    handleError(err: Error): void {
      console.error(err);
    },
  },

  created (): void {
    this.$observable.once(actions.LOG, this.handleLog);
    this.$observable.subscribe(actions.ERROR, this.handleError);
  },

  mounted (): void {
    this.$observable.fire(actions.LOG, 'Mounted');
  },
};

Vue.component('test', component);

/**
 * Creating vue component instance via `vue-class-component`
 */

class ClassComponent extends Vue {

  @Action(actions.ERROR)
  public raiseError: (err: Error) => void;
  
  @Subscribe(actions.LOG)
  public handleLog(...args: any[]) {
    console.log(args);
  }
  
  @Once(actions.ERROR)
  public handleErrorOnce(err: Error): void {
    console.error(err);
  }
}

const test: ClassComponent = new ClassComponent();

test.raiseError(new Error('Some Error'));

/**
 * Creating vue instance
 */

const observable: VueSub = new VueSub({
  observers: {
    [actions.LOG]: [
      console.log,
    ],
  }
});

new Vue({
  observable,
});
