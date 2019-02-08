import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var car=JSON.parse(localStorage.getItem('car')||'[]')
var userInfoL=JSON.parse(localStorage.getItem('userInfoL')||'[]')
var userS=JSON.parse(sessionStorage.getItem('user'||'[]'))
export default new Vuex.Store({//store对象
  modules:{
      goods:{
        state123:{
              number:0,
              show:false
        },
        mutations:{
            switch_dialog(state){//这里的state对应着上面这个state
                state.show = state.show?false:true;
                //你还可以在这里执行其他的操作改变state,commit
            }
        //mapActions
        },
        actions:{
            switch_dialog(context){//这里的context和我们使用的$store拥有相同的对象和方法
                context.commit('switch_dialog');
                //你还可以在这里触发其他的mutations方法,dispatch
            },
        },
        getters:{
            not_show:(state)=>{
                return !this.$store.state.dialog.show;
                //getters
            },
        //  ...mapState,mapGetters({
        //     show:state=>state.dialog.show
        // }),
        }
      },
    car:{
        state:{
                car:car,
                //{id,count,price,selected}
                cCount:0,
               
              
        },
        mutations:{
            addToCar(state,goodsinfo){
                var flag=false
                state.car.some(item=>{
                    if(item.id==goodsinfo.id){
                        item.count+=parseInt(goodsinfo.count)
                        flag=true
                        return true
                    }
                 })
                 if(flag==false){
                  state.car.push(goodsinfo)

                 }
                 localStorage.setItem('car',JSON.stringify(state.car))
                 
            },
            //改变数量
            changeCarCount(state,goodsinfo){
                state.car.some(item=>{
                    if(item.id==goodsinfo.id){
                        item.count=parseInt(goodsinfo.count)
                        return true
                    }
                 })
                localStorage.setItem('car',JSON.stringify(state.car))
            },
            //更改选择状态
            changeCarSelected(state,goodsid){
                state.car.some(function(item){
                    if(item.id==goodsid){
                        item.selected=!item.selected
                        return true
                    }
                })
                localStorage.setItem('car',JSON.stringify(state.car))
            },
            //删除商品
            deleteGoods(state,goodsid){
                state.car.some((item,i)=>{
                        if(item.id==goodsid){
                                state.car.splice(i,1)
                                return true;
                        }
                })
                localStorage.setItem('car',JSON.stringify(state.car))
                
            },
            //清空购物车
            deleteAllGoods(state){
                for(var i=0;i<state.car.length;i++){
                    if(state.car[i].selected)
                  { 
                       state.car.splice(i,1) 
                  }
                }

                localStorage.setItem('car',JSON.stringify(state.car))
            }
        },
        getters:{
            //计算总数
            zCount(state){
               var sum=0
                for(var i=0;i<state.car.length;i++){
                    if(state.car[i].selected)
                  { 
                      sum  += state.car[i].count      
                  }
                }
                return sum
                
            },
            //返回商品数量
            selectGoods:(state)=>(goodsid)=>{
              var gCount=0
                state.car.some(function(item){
                   if(item.id==goodsid){
                        gCount= item.count
                        return true
                    }
                })
                return gCount
            },
            getGoodsSelected:(state)=>{
                var o={}
                state.car.forEach(function(item){
                        o[item.id]=item.selected
                    }
                )
                return o
            },
            //计算总价
            addCarPrice(state){
                var zPrice=0
                for(var i=0;i<state.car.length;i++){
                    if(state.car[i].selected){
                        zPrice+=parseInt(state.car[i].count)*parseInt(state.car[i].price)
                    }
                }
                return zPrice
            }
        }
    },
    toutiao:{
        state:{
            data:{},
            img_url:[]
        },
        getters:{
            getTouTiaoImg_url:(state)=>{
                var img_url=[]
                var img_data=state.data
                var i=0


                for(let key in img_data){
                    
                    if(key=="thumbnail_pic_s"){
                        
                        img_url.push({
                            src: img_data[key],
                            msrc: img_data[key],
                            w: 600,
                            h: 400})
                        i=1   
                    } 
                    else if(i==1){
                        img_url.push({
                            src: img_data[key],
                            msrc: img_data[key],
                            w: 600,
                            h: 400})    
                    }
                } 
                
               return img_url
            }
        }
    },
    userInfo:{
        state:{
            user:userInfoL,
            userSession:userS
        },
        mutations:{
            addToUser(state,userInfo){
                userInfo.money=10000
                state.user.push(userInfo)
                localStorage.setItem('userInfoL',JSON.stringify(state.user))

            },
            //根据手机号改密码
            writePwdByTel(state,userInfo){
              
                state.user.some(item=>{
                    if(item.userTel==userInfo.userTel){
                        item.userPassword=userInfo.userPassword
                    }
                })
                localStorage.setItem('userInfoL',JSON.stringify(state.user))
            },
            //退出用户
            cancelUser(state){
                state.userSession=[]
                sessionStorage.setItem('user',JSON.stringify(state.userSession))
            },
            //更改余额
            addToMoney(state,userInfo){
                state.user.some(item=>{
                    if(item.userId==userInfo.id){
                        item.money=parseFloat(item.money)-parseFloat(userInfo.price)
                        state.userSession.money=item.money
                    }
                })
                localStorage.setItem('userInfoL',JSON.stringify(state.user))
                sessionStorage.setItem('user',JSON.stringify(state.userSession))
            },
            //充值
            addUpMoney(state,userInfo){
                state.user.some(item=>{
                    if(item.userId==userInfo.id){
                        item.money=parseFloat(item.money)+parseFloat(userInfo.money)
                        state.userSession.money=item.money
                    }
                })
                localStorage.setItem('userInfoL',JSON.stringify(state.user))
                sessionStorage.setItem('user',JSON.stringify(state.userSession))
            }
        },
        getters:{
            readUserId:(state)=>(userId)=>{
                var userInfo=state.user
                var q=1
                if(userId==''){  q=0  }
                for(let i=0;i<userInfo.length;i++){ 
                  
                    if(userId===userInfo[i].userId){
                        q=0
                    }
                    
                }
               
                return q==1?true:false
            },
            readUserTel:(state)=>(Tel)=>{
                var userInfo=state.user
                var q=1
                for(let i=0;i<userInfo.length;i++){ 
                 
                    if(Tel===userInfo[i].userTel){
                        q=0
                    }
                    
                }
               
                return q==1?true:false
            },
            //登录储存userSession
            login:(state)=>(userInfo)=>{
                var q=0
                state.user.some(item=>{
                    if(item.userId===userInfo.userId){
                        if(item.userPassword===userInfo.userPassword){
                            state.userSession=item
                            sessionStorage.setItem('user',JSON.stringify(item))
                            q=1
                        }       
                    }
                })
              
                   
                
                return q==1?true:false
            },
            //判断余额
            checkMoney:(state)=>(userInfo)=>{
                var q=0
                state.user.some(item=>{
                    if(item.userId==userInfo.id&&item.money>=userInfo.price){
                        q=1
                    }
                })

                return q==1?true:false
            }
        }
    },
    key:{
        state:{
            //聚合数据key
            mobile:"c27794ca5c94d20fc1a99cb06c143cff",
            toutiao:"7042cfbe9b1cfd788cf888c0d805e260",
            qrcode:"b6ed1f038a9e0dfb2e165927111c5095",
            //图灵api
            tulin:"a5d48f1f54384fc6beffe3b8c167b614"
        }
    },
   
  }
})