<template>
   <div class="news">
	  
       <ul class="mui-table-view">
		   
				<li class="mui-table-view-cell mui-media" v-for="item in newsList.new" :key="item.id">
					<router-link :to="{path:'/news/newsinfo/'+item.id,query:{itemId:item.id}}">
						
						<div class="mui-media-body">
							{{item.biaoti}}<span>{{item.time |dataFormat}}</span>
							<p class="mui-ellipsis">{{item.neirong}}</p>
						</div>
					</router-link>
				</li>
				
			

			</ul>
 
    </div>
</template>
<script>
export default {
	name:"news",
	data(){
		return{
				newsList:[],
				msg:"2018.03.18",
				
		};
	},
	created(){
		this.getNewsList();
	},
	methods:{
		getNewsList(){
			this.$http.get('../../static/ajax_info.json').then(function(res){
			
				 this.newsList=res.body;
            },function(){
                console.log('请求失败处理');
            });
		}
	
	}
}
</script>
<style>

</style>
