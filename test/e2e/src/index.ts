import Vue, { CreateElement } from 'vue';
import Component from 'vue-class-component';
import VueSub, { Action, Subscribe } from 'project';

Vue.use(VueSub);

const observable: VueSub = new VueSub();
const CLICK = 'CLICK';

@Component({
  render (this: App, createElement: CreateElement) {
    return createElement('div', {
      attrs: {
        id: 'root',
      },
     }, [
      createElement('button', {
        attrs: {
          id: 'button',
        },
        on: {
          click: this.handleClick,
        },
      }, this.active.toString()),
    ]);
  }
})
class App extends Vue {
  public active: boolean = false;

  @Action(CLICK)
  public handleClick: () => void;

  @Subscribe(CLICK)
  public changeStatus () {
    this.active = !this.active;
  }
}

new Vue({
  el: '#root',
  observable,
  components: { App },
  render: (h) => h(App),
});
