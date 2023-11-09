import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import { createPinia } from "pinia";

// 引入Element-plus
//import ElementPlus from "element-plus";
//import "element-plus/dist/index.css";
//import zhCn from "element-plus/dist/locale/zh-cn.mjs";

// 引入图标
//import * as ElementPlusIconsVue from "@element-plus/icons-vue";


// 引入echarts
import echarts from "./utils/echarts.ts";


// // 定义全局样式
// import "./style.less";

// 创建Vue实例
const app = createApp(App);


// 创建 Store 实例
//const piniaStore = createPinia();

// 注册 Element-plus图标
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component);
// }

/***********************echart 挂载 START*******************************/

// echarts 挂载到 Vue实例中
// 注意：app.config.globalProperties 和 app.provide('$echarts', echarts) 二选一即可
// Vue.prototype.$echarts = echarts; // vue2的挂载方式

app.config.globalProperties.$echarts = echarts; // vue3的挂载方式（一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。）

app.provide('$echarts', echarts); // vue3采用provide, inject方式使用

// app.use(router).use(piniaStore).use(ElementPlus, {
//     // size: 'small',
//     zIndex: 3000,
//     locale: zhCn,
// });
app.use(router).use(store).use(router).mount('#app')
