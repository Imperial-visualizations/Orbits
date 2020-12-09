import Vue from 'vue';
import App from './App.vue';
import ImpVis from '@impvis/components/dist/impvis-components.js';
import '@impvis/components/dist/impvis-components.css';
import titleMixin from './mixins/titleMixin'
import impviskatex from '@impvis/components-katex'

Vue.use(ImpVis);
Vue.use(impviskatex);
Vue.mixin(titleMixin);
Vue.config.productionTip = false;
Vue.config.silent = true; //surpress vue warnings

//export const bus = new Vue();//bus for title bar to talk to guidance

new Vue({
  render: h => h(App),
}).$mount('#app');press