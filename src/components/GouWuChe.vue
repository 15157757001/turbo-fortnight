<template>
    <div class="shopcar">
        <!--购物车-->
        <div class="mui-card">
				<div class="mui-card-content" v-for="item in shopcar" :key="item.id" >
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="changeSelect(item.id)" :id="item.id"></mt-switch>
                        <img :src="item.img_url" class="img_gwc">
                        <div class="info">
                            
                            <h1 class="title">{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.price}}</span>
                                <numbox @func="getvalue" :itemid="item.id"></numbox>
                                <a href="#" @click.prevent="deleteGoods(item.id)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
		</div>
        <!--结算-->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner zJ">
						
                            <div class="right">
                                <p>总计（不含运费）</p>
                                <p>已勾选商品<span class="red">{{$store.getters.zCount}}</span>件,总价：<span class="red">￥{{$store.getters.addCarPrice}}</span></p>
                            </div>
                           
                       
                                <mt-button type="danger" @click="buy()">结算</mt-button>
                          
                   
                        
					</div>
				</div>
		</div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import numberbox from '../childrencom/gwc_nbbox.vue';
export default {
    name:'gouwuche',
    data(){
        return{
            shopcar:[],
         
        }
    },
    created(){
        this.shopcar=this.$store.state.car.car;
        console.log(this.$store.state.car);
    },
    mounted(){
     
       
    },
    methods:{
        getvalue(data){
            this.value=data;
            console.log(this.value);
        },
        changeSelect(id){
            this.$store.commit('changeCarSelected',id);
            this.changeBadge();
        },
        deleteGoods(id){
            this.$store.commit('deleteGoods',id);
            this.changeBadge();
        },
        //结算
        buy(){
            var userInfo={
                price:this.$store.getters.addCarPrice,
                id:this.$store.state.userInfo.userSession.userId
            }
            //支付成功
            if(this.$store.getters.checkMoney(userInfo)){
                
                this.$store.commit('addToMoney',userInfo);
                
                let instance=Toast({
                        message: '支付成功',
                        iconClass: 'mui-icon iconfont icon-duigou'
                });
                setTimeout(() => {
                        instance.close();
                        this.changeBadge();
                }, 1300);  
               this.$store.commit('deleteAllGoods');
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
           
        },
        changeBadge(){
            const badge= document.getElementById("badge");

            badge.innerHTML="<p>"+this.$store.getters.zCount+"</p>";
            const zC=this.$store.getters.zCount;
            if(zC>=10){
               badge.lastChild.style.right="2px";
            }
            else{
               badge.lastChild.style.right="5px";
            }
        }

       
    },
    components:{
        'numbox':numberbox
    }
    
}
</script>
<style scoped>
.shopcar{
    height: 547px;
    background-color: #eee;
    overflow: scroll;
   
}
img{
    width: 60px;
    height: 60px;
}
.title{
    font-size:13px  ;
}
.mui-card-content-inner{
    display: flex;
    align-items: center;
}
.price{
    color: red;
    font-weight:  bold;
}
.info{
    display: flex;
    flex-direction: column;
    justify-content:space-between;
}
.zJ{
    display: flex;
    
    justify-content:space-between;
}
.red{
    color: red;
    font-weight: bold;
}
.right{
    display: flex;
    flex-direction: column;
    
}
</style>
