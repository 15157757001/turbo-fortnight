<template>
    <div class="goods-list">
           <router-link class="goods-ietm" tag="div" :to="{path:'/gouwu/goods/'+item.id,query:{id:item.id}}" v-for="item in goodslist" :key="item.id"> 
                 <img :src="item.img_url" alt="">
                 <h1 class="title">{{item.title}}</h1>
                 <div class="info">
                     <p class="price">
                         <span class="now">￥{{item.now_price}}</span>
                         <span class="old">￥{{item.old_price}}</span>
                     </p>
                     <p class="sell">
                         <span>热卖中</span>
                         <span>剩{{item.kucun}}件</span>
                     </p>

                 </div>
            </router-link>
            
            
           
           
    </div>
</template>
<script>
export default {
    name:'gouwu',
    data(){
        return{
            goodslist:[],
            
        }
    },
    created(){
        this.getGoodsList();
        
    },
    methods:{
        getGoodsList(){
            this.$http.get('../../static/goods.json').then(
                function(res) {
                    this.goodslist=res.body.goods;
                    
                },function() {
                    console.log('获取失败');
                }
            )
        },
    
    }
}
</script>
<style scoped>
        .goods-list{
            height: 574px;
            display:flex;
            flex-wrap: wrap;
            padding: 7px;
            justify-content: space-between;
            overflow: scroll;
        }
        .goods-ietm{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
        }
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
        }
        .sell{
            display: flex;
            justify-content:space-between;
        }
        .now{
            color: red;
            font-weight: bold;
            font-size:16px ;
        }
        .old{
            text-decoration: line-through;
            font-size:12px ;
            margin-left: 10px;
        }
        .price{
            display: flex;
        }
</style>

