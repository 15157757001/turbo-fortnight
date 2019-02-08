<template>
    <div class="nav" id="scroll_y" ref="nav">
      
        <ul>
            
            <li v-for="item in video" :key="item.id" @click="show_intterval(item.id)">
                <div class="myDiv">
                    <video :src="item.playUrl" controls="controls"
                    :ref="item.id" preload="meta" :id="item.id"></video>
                    <div class="content">
                        <span>{{item.description}}</span>
                    </div>
                    <span class="in_Div mui-icon iconfont icon-bofang"
                    v-show="show_bofang(item.id)" @click.stop="play(item.id)"></span>
                    <span class="in_Div mui-icon iconfont icon-zanting"
                    v-show="show_zanting(item.id)" @click.stop="pause(item.id)"></span>
                
               </div>
            </li>
            
        </ul>
        <div class="ready container" v-show="show_ready()">
            <div class="spinner">
                <div class="dot1"></div>
                <div class="dot2"></div>
            </div>
            <div class="ready_content">
                
                <meter max="100" min="0" low="110" :value="percent"></meter>
                <span>正在加载，请稍后。。。</span>
                
                <span>可能出现加载缓慢的情况，请刷新页面。</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
        name:'shipin',
        data(){
            return{
                video:[],//临时储存视频{id:1,playUrl:"",img:"",description:""}
                videoList:[],//视频列表
                id:null,
                flag:1,//1播放 2暂停
                flagC:1,//储存状态
                flagA:false,//true显示当前span
                flagB:false,//false隐藏span
                timer_S:null,//显示计时器
                timer_N:null,//click触发的计时器
                timer_L:null,//滚动计时器
                i:0,
                percent:0,
                current:0
            }
        },
        created(){
            this.getVideoList();
        },
        mounted(){
           
          
             
        },
        updated(){
            
            //if限制更新DOM
            if(this.i<this.video.length){
            //循环绑定refs的监视器
               const self = this;
               
                this.video.forEach((item)=>{
                    var ooo=2
                    this.i++;    
                        this.$refs[item.id][0].addEventListener('canplaythrough',self.canplaythrough.bind(self,item.id));
                        this.$refs[item.id][0].addEventListener('play',self.play.bind(self,item.id));
                        
                        this.$refs[item.id][0].addEventListener('pause',self.pause.bind(self,item.id));  
                        //this.$refs[item.id][0].style.filter= "brightness(0.5)";
                        //回调函数不能使用i
                        this.$refs[item.id][0].addEventListener('ended', ()=> {
                            this.$refs[item.id][0].style.filter= "brightness(0.5)";
                            //Q为数组的key
                            var Q=-1;
                            for(let q=0;q<this.video.length-1;q++){
                                if(this.video[q].id==item.id){
                                    Q=q+1;
                                }}                                              
                            let ID=this.video[Q].id;
                            this.play(ID);
                            this.show_intterval(ID);
                        }, false);
                      
                    });     
                    
                 
                window.addEventListener('scroll',self.myEfficientFn,true); 
                
            }
        },
        destroyed(){
                const self = this;
                window.removeEventListener('scroll',self.myEfficientFn,true);
            this.video.forEach((item)=>{       
                document.getElementById(item.id).addEventListener('canplaythrough',self.canplaythrough.bind(self,item.id));        
                document.getElementById(item.id).removeEventListener('play',self.play.bind(self,item.id));
                document.getElementById(item.id).removeEventListener('pause',self.pause.bind(self,item.id));
            }); 
        },
        methods:{
            com(id){console.log(id)},
            //滚动触发事件
            myEfficientFn(){
                   
                   
                    clearTimeout(this.timer_L);
                    this.timer_L=setTimeout(()=>{
                     var q=0;
                        this.video.some((item)=>{
                            var h=item.scrollHeight-document.getElementById("scroll_y").scrollTop
                            var ID=item.id; 
                            if(0<=h&&h<=200){
                             
                                //不为选中状态
                                if(!item.playState)
                                {   
                                    this.show_intterval(ID);         
                                    this.play(ID); 
                                }
                                //为选中状态不执行暂停
                                else{
                                    q=1
                                }
                                
                            }
                            else{
                                this.$refs[item.id][0].style.filter= "brightness(0.5)";                               
                                if(q=0){
                                    this.pause(ID);
                                }
                            }
                        });
                    
                                  
                    },500);
            },
            //获取视频列表
            getVideoList(){
                this.$http.get('api_video/videoRecommend?id=127398').
                then((res)=>{
                    this.videoList=res.body.result;
                    this.videoList.splice(0,1);
                    this.handleVideoList();
                }).catch(function(){
                    console.log("获取失败123");
                })
            },
            //处理视频列表
            handleVideoList(){
                var list={};
                for(let i=0;i<this.videoList.length;i++){
                    list={
                        id:this.videoList[i].data.id,
                        playUrl:this.videoList[i].data.playUrl,
                        description:this.videoList[i].data.title,
                        playState:false, //true为选中状态
                        scrollHeight:210*i,
                        ready:false
                    };
                    this.video.push(list);
                }
             
            },
            //播放事件
            play(id){
                clearTimeout(this.timer_S);
                clearTimeout(this.timer_N);
                this.$refs[id][0].play();
                this.flag=2;
                //只允许当前选中状态修改储存
                this.video.some((item)=>{
                    if(item.id==id&&item.playState){
                        this.flagC=this.flag;
                    }
                })
                 
                this.timer_S=setTimeout(()=>{
                this.flag=0;
                },2000);
                this.$refs[id][0].style.filter= "brightness(1)";
            },
            //暂停事件
            pause(id){
                
                clearTimeout(this.timer_S);
                clearTimeout(this.timer_N);
                this.$refs[id][0].pause();
                this.flag=1;
                //只允许当前选中状态修改储存
                this.video.some((item)=>{
                    if(item.id==id&&item.playState){
                        this.flagC=this.flag;
                    }
                }); 
                
                this.timer_S=setTimeout(()=>{
                    this.flag=0;
                },2000);
            },
            //预加载
            canplaythrough(id){
                
                this.video.some((item)=>{
                    if(item.id==id){
                        item.ready=true;
                        this.current++
                        this.percent=100*this.current/this.video.length;
                    }
                }); 
            },
            //判断播放状态
            show_bofang(id){
                var Q=-1;
                for(let q=0;q<this.video.length;q++){
                        if(this.video[q].id==id){
                            Q=q;
                        }}  
                if(this.flag==1&&this.video[Q].playState){
                     return true;
                }
               
              
            },
            //判断暂停状态
            show_zanting(id){
                var Q=-1;
                for(let q=0;q<this.video.length;q++){
                        if(this.video[q].id==id){
                            Q=q;
                        }}  
                if(this.flag==2&&this.video[Q].playState){
                     return true;
                }
            },
            //click触发事件显示播放或暂停
            show_intterval(id){
                //var videoScrollHeight=0;
               // this.video.some((item)=>{
               //     if(item.id=id){
                //        videoScrollHeight=item.scrollHeight;
                //    }
               // });
                
               // var h=videoScrollHeight-document.getElementById("scroll_y").scrollTop;
               // if(0<=h&&h<=200){
                    for(let q=0;q<this.video.length;q++){
                            if(this.video[q].id==id){
                                this.video[q].playState=true;
                                this.$refs[id][0].style.filter= "brightness(1)";
                            }
                            else{
                                this.video[q].playState=false;
                                var Id=this.video[q].id;
                                this.pause(Id);
                                this.$refs[Id][0].style.filter= "brightness(0.5)";
                            }
                    }  
                    clearTimeout(this.timer_S);
                    clearTimeout(this.timer_N);
                    this.flag=this.flagC;
                    this.timer_N=setTimeout(()=>{
                        this.flag=0;
                    },5000);
               // }
              //  else{
               //     this.$refs[id][0].scrollIntoViewIfNeeded(true);
               // }
            },
            show_ready(){            

                if(this.percent>=100)
                {
                    this.$refs.nav.style.overflow="scroll";
                    
                    return false;
                    
                }
                else{
                    return true;
                
                }
            }
            
        },
 
}
</script>
<style scoped>
    
    .nav{
        height: 570px;
        position:relative;
        overflow:hidden;
    }
    .ready{
        
        
        background-color: #EA4961;
        height: 97%;
        width: 400px;
        z-index: 999;
    }
    @media screen and (max-width: 768px){
        .ready{
            width: 100%;
        }
        video{
            height: 195px;
        }
        .nav{
            overflow:scroll;
        }
    }
    .ready_content{
        display:flex;
        flex-direction: column;
        
    }
    .ready_content span{
        margin-bottom: 10px;
        margin-top: 10px;
        font-size: 20px;
        color: white;
        filter: brightness(1);
    }
    meter{
        width: 80%;
        height: 20px;
        margin:auto auto;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    video{
        width: 100%;
        
    }
    ul{
        list-style: none;
         /*-webkit-filter: grayscale(1); Webkit */
        /* filter: gray; IE6-9 */  
        
    }
    video{
       filter: brightness(0.5);
    }
    span{
        font-size: 13px;
        color: white;
        filter: brightness(0.5);
    }
    .content{
        background-color: black;
        filter: brightness(0.5);
    }
   .myDiv{
       position: relative;
       display: flex;
       flex-direction: column;
      
   }
   .in_Div{
       z-index: 66;
       position:absolute;
       top: 26%;
       left: 43%;
       height: 50px;
       width:50px;
      
        border-radius: 50px;
        font-size: 50px;
   }
    .spinner {
        margin: 40% auto;
        width: 90px;
        height: 90px;
        position: relative;
        text-align: center;
        
        -webkit-animation: rotate 2.0s infinite linear;
        animation: rotate 2.0s infinite linear;
    }
        
    .dot1, .dot2 {
        width: 60%;
        height: 60%;
        display: inline-block;
        position: absolute;
        top: 0;
        background-color: white;
        border-radius: 100%;
        
        -webkit-animation: bounce 2.0s infinite ease-in-out;
        animation: bounce 2.0s infinite ease-in-out;
    }
        
    .dot2 {
        top: auto;
        bottom: 0px;
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }
        
    @-webkit-keyframes rotate { 100% { -webkit-transform: rotate(360deg) }}
    @keyframes rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}
        
    @-webkit-keyframes bounce {
        0%, 100% { -webkit-transform: scale(0.0) }
        50% { -webkit-transform: scale(1.0) }
    }
        
    @keyframes bounce {
        0%, 100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        } 50% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
        }
    }
</style>
