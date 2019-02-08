<template>
   <div class="container1">
       
        <h3 class="title">{{biaoti}}</h3>
        
        <p class="subtitle">
             <span>来源：{{laiyuan}}</span>
            <span>时间：{{time|dataFormat}}</span>
        </p>
        <vue-preview :slides="slide1" :class="['view',flag?'active':'']"
        @close="handleClose"></vue-preview>
      
       
        
        <div class="content2">&nbsp;&nbsp;&nbsp;&nbsp;
        <a :href="neirong">相关内容</a></div>
       
     

    </div>   
</template>
<script>

export default {
    name:"photoinfo",
    data(){
        return {
            id:this.$store.state.toutiao.data.uniquekey,
            biaoti:this.$store.state.toutiao.data.title,
            time:this.$store.state.toutiao.data.date,
            laiyuan:this.$store.state.toutiao.data.author_name,
            neirong:this.$store.state.toutiao.data.url,
            slide1:this.$store.getters.getTouTiaoImg_url,
            flag:false
       
        };
    },
    methods:{
        handleClose () {
            console.log('close event')
        },
        enter(){
            this.flag=true
           
        },
        leave(){
            this.flag=false
           
        }
    }

}
</script>
<style>
    .title{
        font-size: 20px;
        line-height:30px;
    }
    .subtitle{
        font-size: 13px;
        display: flex;
        justify-content: space-between;
    }
    .content2{
        
        font-size: 20px;
        
    }
    .container1{
        height: 547px;
        overflow:scroll;
    }
    .view{
        overflow: hidden;   
        
        
        border:1px solid black; 
       
        
    }
    .view :only-child{
        
        
        
        width: 100px;
        height: 75px;
        border:1px solid black; 
       
    }
    .my-gallery{
        width: 100%;
        height: 100%;
        padding: 15px 10px 0px 10px;
        display:flex;    
        flex-wrap: wrap;
        justify-content:space-around;
        align-content:space-around;
        flex-direction:row;
    }
    
</style>
