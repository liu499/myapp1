import Vue from 'vue'
import Router from 'vue-router'
import shop from "./shop"
import  admin from "./admin"

Vue.use(Router)

export default new Router({
  routes:shop.concat(admin)//concat 数组合并
})
