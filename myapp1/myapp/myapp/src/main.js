// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Login from './Login'
import router from './router'

import axios from "axios";

import ElementUI from 'element-ui';//引入
import 'element-ui/lib/theme-chalk/index.css';//引入

import store from "./vuex"//引入vuex
import study from "./study"
import filters from "@/filters"

Vue.config.productionTip = false
Vue.use(ElementUI);//使用
Vue.prototype.$ajax=axios

//遍历过滤
for(var key in filters){
	Vue.filter(key,filters[key])
}




//  1、请求拦截request    axios的 interceptors  拦截器     config 你要请求的信息
axios.interceptors.request.use((config)=>{//拦截请求信息 通过use  传一个回调函数
		// config.url="http://127.0.0.1"+config.url
		config.url="ele"+config.url;
		return config
})

//2、响应拦截  response
axios.interceptors.response.use(({data})=>{
		return data
})



new Vue({
  el: '#app',
  router,
  store,
  components: { App,Login,study},
  template: `
<components :is="$store.state.admin.adminId?'App':'Login'"/>
	`
	// <components is="study"/>
})
