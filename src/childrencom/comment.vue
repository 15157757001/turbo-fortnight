<template>
<div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <textarea placeholder="请评论" maxlength="120" v-model="plun"></textarea>
     <mt-button type="primary" size="large" @click="pushpl">发表评论</mt-button>
           <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> 
            <ul>
            <li class="cm1" v-for="item in pllist" :key="item.id">
                <div class="cm2"> 
                    <div class="cm3">{{item.id}}楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：{{item.time|dataFormat}}</div>
                    <div class="cm4">{{item.neirong}}</div>
                </div>
            </li>
            </ul>  
            </mt-loadmore>
     <mt-button type="danger" size="large" @click="fh1L">返回一楼</mt-button>
</div>
</template>
<script>

export default {
    name:"comment",
    data(){
        return {
            count:1,
            pllist:[],
            plun:null,
            dataT:null,
            pageNo:1,
            pageSize:50,
            proCopyright:[],
            allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
            totalpage:0,
            loading:false,
            bottomText: '',
            time:0,
   
          

        }
    },
    created(){
        this.getpl();
    },
    methods:{
        pushpl(){
            
             var dt=new Date();
             this.dataT=dt.toLocaleDateString();
             this.$http.get('http://localhost:3001/write',{
                 params:{
                 time:  this.dataT, neirong:this.plun , p: this.time
             }}).then(function(res) {
                this.pllist=res.body;
            
            }).catch(function(){
                console.log("获取失败1");
            });
      
        },
        getpl(){
            this.$http.get('http://localhost:3001/read',{
                params:{
                        time:this.time
                }
            }
            ).then(function(res) {
                this.totalpage=res.body[0].id+4;
                this.isHaveMore();
                console.log(this.allLoaded);
                if(!this.allLoaded)
                {
                    this.pllist=res.body;
                }
            }).catch(function(){
                console.log("获取失败123");
                this.time--;
            })
            },
        more(){
            this.time++;
           
            console.log(this.time);
            this.getpl();
        },
        loadBottom:function() {
     
            this.more();
             this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
         },
        isHaveMore:function(){
                // 是否还有下一页，如果没有就禁止上拉刷新
                 //this.allLoaded = false; //true是禁止上拉加载
            if((this.time+1)*5 <= this.totalpage){
             this.allLoaded = false;
                }
                else{
                    this.allLoaded = true;
                }
        },
        fh1L(){
            this.time=0;
             this.$http.get('http://localhost:3001/read',
            {
                params:{
                        time:this.time
                }
            }
            ).then(function(res) {
            this.pllist=res.body;
            this.isHaveMore();
            }).catch(function(){
                console.log("获取失败123");
            })
        }
     


         
            
        }

        
    }

</script>

<style>
    .cm1{
    margin: 5px 0;
    }
    .cm2{
                font-size: 13px;
               
        }
    .cm3{
                line-height: 30px;
                background-color: #ccc;
        }
    mt-loadmore{
                height: 55%
        }
</style>

