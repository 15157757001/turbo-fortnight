<template>
 
    <div class="container1">
       
        <h3 class="title">{{news.biaoti}}</h3>
        
        <p class="subtitle">
             <span></span>
            <span>时间：{{news.time|dataFormat}}</span>
        </p>
        <hr>
        <div class="content">{{news.neirong}}</div>
        <comment-box></comment-box>
     

    </div>   
  
</template>
<script>
import comment from './comment.vue'
export default {
    name:"newsinfo",
    data(){
        return{
           news:[],
           position:null
        }
    },
   
    created(){
        this.getnews();
    },
    methods:{
        getnews(){
               this.$http.get('../../static/ajax_info.json').then(
                   function(res){
                       this.news=res.body.new[this.$route.query.itemId-1];
                   },function(){
                    console.log('请求失败处理');
                 }
               );
        },
        
    },
    components:{
        'comment-box':comment
    }
}
</script>

<style>
    .title{
        font-size: 16px;
    }
    .subtitle{
        font-size: 13px;
        display: flex;
        justify-content: space-between;
    }
    .content{
        font-size: 13px;
        
    }
    .container1{
        height: 547px;
        overflow:scroll;
    }
    
    
</style>
