<template>
   <div class="mui-content nar">
       <transition 
        @before-enter="beforeEnter"
		@enter="enter" 
	    @after-enter="afterEnter"
       name="my"><div class="p" v-show="flag" ref="ball"><p>{{count}}</p></div></transition>
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <mt-swipe :auto="4000" id="lunbo">
                            <mt-swipe-item v-for="item in goodsList.img_url_m" :key="item.img_url">
                                <img :src="item.img_url" class="mt"/>
                            </mt-swipe-item>
                           
                        </mt-swipe>
					</div>
				</div>
			</div>
			<div class="mui-card">
				<div class="mui-card-header">{{goodsList.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p class="price">
                           销售价： <span class="now">￥{{goodsList.now_price}}</span>
                           市场价： <span class="old">￥{{goodsList.old_price}}</span>
                        </p>
                        <div class="number">
                            购买数量：
                            <number-box @getcount="getcount"
                             :count123="count"></number-box>
                        </div>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" @click="buygoods">立即购买</mt-button>
                    <mt-button type="danger" size="large" @click="addgoods">加入购物车</mt-button>
                </div>
			</div>
			
	
			
			
			<div class="mui-card">
				<div class="mui-card-header">
					商品参数
				</div>
				<div class="mui-card-content canshu">
                    <p>商品货号：{{goodsList.id}}</p>
                    <p>库存情况：{{goodsList.kucun}}</p>
                    <p>上架时间：{{goodsList.sell_time|dataFormat}}</p>
                </div>
				<div class="mui-card-footer bt">
				    <mt-button type="primary" size="large" plain @click="goDesc(2)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(2)">商品评论</mt-button>
               
				</div>
			</div>
			
			
		</div>
</template>
<script>
import { Toast } from 'mint-ui';
import numberbox from './numberbox.vue';
export default {
    name:'goods',
    data(){
        return{
            flag:false,
            count:0,
            max:10,
            goodsList:[]
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        goDesc(id){
            this.$router.push({name:"goodsdesc",params:{id}})
        },
        goComment(id){
            this.$router.push({name:"goodscomment",params:{id}})
        },
        addgoods(){
            if(this.count!=0)
            {
                this.flag = !this.flag;
                var goodsinfo={
                    id:this.goodsList.id,
                    count:parseInt(this.count),
                    price:this.goodsList.now_price,
                    selected:true,
                    img_url:this.goodsList.img_url,
                    title:this.goodsList.title
                };
                this.$store.commit("addToCar",goodsinfo);
            }
            else{
                
            }
        },
        buygoods(){
            if(this.count!=0)
            {
                    
                    var userInfo={
                        price:this.count*this.goodsList.now_price,
                        id:this.$store.state.userInfo.userSession.userId
                    }
                    //支付成功
                    if(this.$store.getters.checkMoney(userInfo)){
                        this.count=0;
                        this.$store.commit('addToMoney',userInfo);
                        
                        let instance=Toast({
                                message: '支付成功',
                                iconClass: 'mui-icon iconfont icon-duigou'
                        });
                        setTimeout(() => {
                                instance.close();
                                this.changeBadge();
                        }, 1300);  
                    this.count=0;
                    }
                    //余额不足
                    else{
                        let instance=Toast({
                                message: '余额不足',
                                iconClass: 'mui-icon iconfont icon-guanbi'
                        });
                        setTimeout(() => {
                                instance.close();
                        }, 1400);    
                    }
                
            }
            else{
                
            }
        },
        beforeEnter(el){
		    el.style.transform='translate(0,0)';
		},
		enter(el,done){
            el.offsetWidth;
            const ballPosition=this.$refs.ball.getBoundingClientRect();
            const badgePosition=document.getElementById("badge")
            .getBoundingClientRect();
            const X=badgePosition.left-ballPosition.left;
            const Y=badgePosition.top-ballPosition.top;
            console.log(X); 
            el.style.transform="translate(" + X + "px," + Y+ "px)"; ;    
            el.style.transition='all 1s cubic-bezier(.19,-0.26,1,.51)';
            done();
		},
		afterEnter(el){	
         
          
            this.flag = !this.flag;
            const badge= document.getElementById("badge");

            badge.innerHTML="<p>"+this.$store.getters.zCount+"</p>";
            const zC=this.$store.getters.zCount;
            if(zC>=10){
                badge.lastChild.style.right="2px";
            }
        },
        getcount(n){
           
            this.count=n;
        
        },
        //获取商品详情
        getGoodsList(){
            this.$http.get('../../static/goods.json').then(
                function(res){
                    this.goodsList=res.body.goods[this.$route.query.id-1];
                    console.log(this.goodsList);
                },function(){
                    console.log('获取失败');
                }
            );
        }
    },
    components:{
        'number-box':numberbox
    }
}
</script>

<style scoped>
 #lunbo{
     height: 250px;
    
 }
 .mt{
     height:200px;
 }
.now{
            color: red;
            font-weight: bold;
            font-size:16px ;
            margin-right: 10px;
}
.old{
            text-decoration: line-through;
            font-size:12px ;
}
.price{
    display:flex;
}
.number{
    display:flex;
}
.nar{
    height: 547px;
    overflow:scroll;
    position:relative;
}
.canshu{
   text-align: left;
   margin-left: 15px;
}
.bt{
    display: block;
    
}
.bt :first-child{
    margin-bottom: 15px;
}
.p{
    
     width: 20px;
      height: 20px;
      background-color: red;
      border-radius: 50%;
      position:absolute;
      top:399px;
      right: 209px;
    z-index: 99;
}
.p :last-child{

  color: aliceblue;
  display:block;
     position: relative;
  
      top: 1px;
      right:0px ;
}


</style>
