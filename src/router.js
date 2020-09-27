import Vue from "vue";
import Router from "vue-router";
import Login from './views/login';
import layout from './components/layout.vue';

import Home from './views/home';
import Goods from './views/goods';
import Member from './views/member';
import Supplier from './views/supplier';
import Staff from './views/staff';
Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "layout",
      component: layout,
      redirect: 'home',
      children:[
        {
          path:'/home',
          component:Home,
          meta:{title:'首页'}
        }
      ]
    },
    
    {
     
      path:'/member',
      component:layout,
      children:[
        {
          path:'/',
          component:Member,
          meta:{title:'会员管理'}
        }
      ]
    },
    
    {
      
      path:'/supplier',
      component:layout,
      children:[
        {
          path:'/',
          component:Supplier,
          meta:{title:'供应商'}
        }
      ]
    },
    {
      path:'/goods',
      component:layout,
      children:[
        {
          path:'/',
          component:Goods,
          meta:{title:'商品'}
        }
      ]
    },
    {
      path:'/staff',
      component:layout,
      children:[
        {
          path:'/',
          component:Staff,
          meta:{title:'员工'}
        }
      ]
    }
  ]
});
