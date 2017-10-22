# @Eazymov/vue-sub

[![npm](https://img.shields.io/npm/v/vue-sub.svg)](https://www.npmjs.com/package/vue-sub)
[![License](https://img.shields.io/npm/l/vue-sub.svg)](https://www.npmjs.com/package/vue-sub)

> Simple observer pattern implementation for VueJS

## Installation

### Direct `<script />` include:

Include VueSub **after** vue. Plugin will be installed automatically.

```html
<script src="link/to/vue"></script>
<script src="https://cdn.jsdelivr.net/gh/eazymov/vue-sub@latest/dist/vue-sub.min.js"></script>
```

### NPM

```bash
npm install vue-sub --save
```

### Yarn

```bash
yarn add vue-sub
```

### When used with a module system, you must explicitly install VueSub via Vue.use():

```javascript
import Vue from 'vue';
import VueSub from 'vue-sub';

Vue.use(VueSub);
```
You don't need to do this when using global script tags.

## Usage

Creating the `observable`

```javascript
import Vue from 'vue';
import VueSub from 'vue-sub';

Vue.use(VueSub);

const observable = new VueSub();

const app = new Vue({
  observable,
});
```

Using inside the component

```javascript
const componentA = {
  mounted () {
    this.$observable.subscribe(actionType, handler);
  }
}

const componentB = {
  handleClick () {
    this.$observable.fire(actionType);
  }
}
```

To unsubscribe from an event use `$observable.unsubscribe`

```javascript
const component = {
  mounted () {
    this.$observable.subscribe(actionType, handler);
    this.$observable.unsubscribe(actionType, handler);
    this.$observable.fire(actionType); // won't work
  }
}
```

If you want to react to an event only once, you can use `$observable.once`

```javascript
const component = {
  mounted () {
    this.$observable.once(actionType, handler);
    this.$observable.fire(actionType); // fires only once
  }
}
```

### When using class components and typescript

```javascript
import Vue from 'vue';
import { Action, Subscribe, Once } from 'vue-sub';

@Component
export class MyComponent extends Vue {
  @Action('foo')
  public actionFoo: (params: Params) => void;
  
  @Subscribe('bar')
  public handler (): void {
    // Fires every time 'bar' emits
  }
  
  @Once('bar')
  public anotherHandler (): void {
    // Fires only once
  }

  public created (): void {
    this.actionFoo(params); // -> $observable.fire('foo', params);
  }
}
```

## Questions

If you have any troubles or questions you can create the issue or text me on [email](mailto:eazymovcode@gmail.com) any time

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 - present, Eduard Troshin
