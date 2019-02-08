<template>

<div class="shouye">
<mt-swipe :auto="4000" class="lunbo">
  <mt-swipe-item id="mt1">
      <img src="../assets/mt1.jpg" class="mt"/>
  </mt-swipe-item>
  <mt-swipe-item id="mt2">
      <img src="../assets/mt2.jpg" class="mt"/>
  </mt-swipe-item>
  <mt-swipe-item id="mt3">
      <img src="../assets/mt3.jpg" class="mt"/>
  </mt-swipe-item>
</mt-swipe>




<ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/ShouYe/news">
		                <img src="../assets/menu1.png" class="mi"/>
		                    <div class="mui-media-body">文章</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/ShouYe/photolist">
		                   <img src="../assets/menu2.png" class="mi"/>
		                    <div class="mui-media-body">图片</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/ShouYe/gouwu">
		                       <img src="../assets/menu3.png" class="mi"/>
		                    <div class="mui-media-body">购物</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/ShouYe/liuyan">
		                    <img src="../assets/menu4.png"  class="mi"/>
		                    <div class="mui-media-body">留言</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/ShouYe/shipin">
		                    <img src="../assets/menu5.png" class="mi"/>
		                    <div class="mui-media-body">视频</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/ShouYe/guanyu">
		                      <img src="../assets/menu6.png" class="mi"/>
		                    <div class="mui-media-body">关于</div></router-link></li>		          
</ul> 

</div>
</template>
<script>

 export default{
    name:'ShouYe',
    data(){
        return{
            lunbotulist:[]
        };
    },
    created(){
            //this.getlunbotu();
    },
    methods:{
        //getlunbotu(){
           // this.$http.get().then(result=>{
           //     result.body.status===0
            //    this.lunbotulist=result.body.message;
          //  });
        //},
    }
 }


</script>
<style scoped>
.lunbo{
    height: 200px;
}


.mt{
     height: 250px;
}
.mi{
    height: 50px;
}
</style>
