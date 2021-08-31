import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import VueDraggableResizable from 'vue-draggable-resizable';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueDraggableResizable);

new Vue({
  render: h => h(App),
}).$mount('#app');
