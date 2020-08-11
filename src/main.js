import Vue from 'vue';
import App from './App.vue';
import ImpVis from '@impvis/components';
import '@impvis/components/dist/impvis-components.css';

Vue.use(ImpVis);
Vue.config.productionTip = false;
Vue.config.silent = true;

//export const bus = new Vue();//bus for title bar to talk to guidance

new Vue({
  render: h => h(App),
}).$mount('#app');