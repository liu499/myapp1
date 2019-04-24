// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from "axios"
import filters from "@/filters/index";
import $ from "jquery"
Vue.use(MintUI)

//遍历过滤器 作为全局过滤器
for(var key in filters){
    Vue.filter(key,filters[key])
}

Vue.config.productionTip = false

axios.interceptors.request.use((config)=>{
    config.url="http://127.0.0.1:8081"+config.url
    // config.headers.authorization=""
    return config
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
