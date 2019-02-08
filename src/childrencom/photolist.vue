<template>

    <div>
     <mt-navbar v-model="selected" class="top">
  <mt-tab-item id="1">头条</mt-tab-item>
  <mt-tab-item id="2">社会</mt-tab-item>
  <mt-tab-item id="3">国内</mt-tab-item>
  <mt-tab-item id="4">国际</mt-tab-item>
  <mt-tab-item id="5">娱乐</mt-tab-item>
</mt-navbar>

<!--     tab-container -->
<mt-tab-container v-model="selected" class="container mt-tab">
      <!--   <mt-tab-container-item :id="i" class="mt-tab" v-for="i in number" :key="i">-->
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> 
            <ul>
                <li v-for="item in list" :key="item.thumbnail_pic_s">
                <router-link :to="{path:'/photolist/photoinfo/'+item.uniquekey}" 
                @click.native="pushTouTiao(item.uniquekey)" >
                <img v-lazy="item.thumbnail_pic_s">
                <div class="content"><p class="pcontent">{{item.title}}</p></div>
                </router-link>
                </li>
                <li><mt-button type="danger" size="large" v-if="allLoaded">没有更多数据了</mt-button></li>
                <li></li>
            </ul>
            
          </mt-loadmore>
        <!--   </mt-tab-container-item>-->
        
</mt-tab-container>
           
    </div>
</template>
<script>


export default {
    name:"photolist",
    data(){
        return {
            photols:[],//全部数据
            selected:"0",
            allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
            totalpage:0,
            loading:false,
            bottomText: '',
            list:[],//部分数据
            time:1,
            type:"top",
 
           
        }
    },
    created(){
        this.show();
       // console.log(this.$router);
    },
    mounted(){
      
    },
    watch:{
        //监控导航栏
        selected:function(val,oldval){
            switch(val){
                    case "1":
                        this.type="top";
                        break;
                    case "2":
                        this.type="shehui";
                        break;
                    case "3":
                        this.type="guonei";
                        break;
                    case "4":
                        this.type="guoji";
                        break;
                    case "5":
                        this.type="yule";
                        break;
                    
            }
         
            this.loadTop();
        }

    },
    methods:{
        show(){
            this.selected="1";
        },
        //turn(val){
            //console.log(val);
            //console.log(this.selected);
        //},
        //获取全部数据
        getPhotolist(){
            this.$http.get('api_news/index?key='+this.$store.state.key.toutiao+'&type='+this.type).then((response) => {

            this.photols=response.body.result.data;
            //截取部分数据
            this.list=this.photols.slice(0,5);
            
            }, (response) => {
            this.error = response.error_code
            }).catch(function(){
                console.log("获取失败");
            });

        },
        
       
        loadTop() {
        //重置次数
        this.time=1;
        this.getPhotolist();
        
        if(this.time!=6){
            this.allLoaded = false;// 若数据已全部获取完毕
        }
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
        },
        loadBottom() {
        this.time++;
        this.list=this.photols.slice(0,5*this.time);
        if(this.time==6){
            this.allLoaded = true;// 若数据已全部获取完毕
        }
        this.$refs.loadmore.onBottomLoaded();
        },
        //选中数据存入store
        pushTouTiao(toutiaoid){

            this.photols.some(item=>{
                if(item.uniquekey==toutiaoid){
                    this.$store.state.toutiao.data=item;
         
                    return true;
                    
                }
            });
             //js添加路由，由于v-for需要绑定to
            // this.$router.push({name:'photoinfo',params:{id:toutiaoid}});
        }
  
    },
    
}
</script>
 <style scoped>
image{
  width: 40px;
  height: 300px;
  margin: auto;
}

.mt-tab{
    height:547px;
    overflow:scroll;
}
.content{
    background-color:grey;

}
.pcontent{
    color:azure;
    font-size: 16px;
}
.container{
    padding-top:  5px;
}
</style>
