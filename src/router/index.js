import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ShouYe from '@/components/ShouYe'
import GouWuChe from '@/components/GouWuChe'
import GeRen from '@/components/GeRen'
import ChengXu from '@/components/ChengXu'
import User from '@/components/User'
import news from '@/childrencom/news'
import newsinfo from '@/childrencom/newsinfo'
import photolist from '@/childrencom/photolist'
import photoinfo from '@/childrencom/photoinfo'
import shipin from '@/childrencom/shipin'
import gouwu from '@/childrencom/gouwu'
import goods from '@/childrencom/goods'
import goodsinfo from '@/childrencom/goodsinfo'
import goodsdesc from '@/childrencom/goodsdesc'
import goodscomment from '@/childrencom/goodscomment'
import zhuce from '@/childrencom/zhuce'
import guanyu from '@/childrencom/guanyu'
import wangji from '@/childrencom/wangji'
import userInfo from '@/childrencom/userInfo'
import chongzhi from '@/childrencom/chongzhi'
import liuyan from '@/childrencom/liuyan'

Vue.use(Router)

export default new Router({
  routes: [
   
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    
    {
      path: '/',
      name: 'shouye',
      component: ShouYe
     
    },
    
    {
      path: '/huiyuan',
      name: 'huiyuan',
      component: HelloWorld
    },
    
    {
      path: '/gouwuche',
      name: 'gouwuche',
      component: GouWuChe
    },
    
    {
      path: '/geren',
      name: 'geren',
      component: GeRen
    },
    {
      path: '/chengxu',
      name: 'chengxu',
      component: ChengXu
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path:'/ShouYe/news',
      name:'news',
      component:news
    },
    {
      path:'/ShouYe/liuyan',
      name:'liuyan',
      component:liuyan
    },
    {
      path:'/ShouYe/shipin',
      name:'shipin',
      component:shipin
    },
    {
      path:'/news/newsinfo/:id',
      name:'newsinfo',
      component:newsinfo
    },
    {
      path:'/ShouYe/photolist',
      name:'photolist',
      component:photolist
    },
    {
      path:'/photolist/photoinfo/:id',
      name:'photoinfo',
      component:photoinfo
    },
    {
      path:'/ShouYe/gouwu',
      name:'gouwu',
      component:gouwu
    },
    {
      path:'/ShouYe/guanyu',
      name:'guanyu',
      component:guanyu
    },
    {
      path:'/gouwu/goods/:id',
      component:goods
    },
    {
      path:'/goods/goodsinfo/:id',
      name:'goodsinfo',
      component:goodsinfo
    },
    {
      path:'/goods/goodsdesc',
      name:'goodsdesc',
      component:goodsdesc
    },
    {
      path:'/goods/goodscomment',
      name:'goodscomment',
      component:goodscomment
    },
    {
      path:'/geren/zhuce',
      name:'zhuce',
      component:zhuce
    },
    {
      path:'/geren/wangji',
      name:'wangji',
      component:wangji
    },
    {
      path:'/user/userInfo',
      name:'userInfo',
      component:userInfo
    },
    {
      path:'/user/chongzhi',
      name:'chongzhi',
      component:chongzhi
    },
  ]
})
