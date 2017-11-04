/**
 * Augment the typings of Vue.js
 */

import Vue from 'vue';
import { VueSub } from './vue-sub';

declare module "vue-sub";

declare module "vue/types/vue" {
  interface Vue {
    $observable: VueSub;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    observable?: VueSub;
  }
}
