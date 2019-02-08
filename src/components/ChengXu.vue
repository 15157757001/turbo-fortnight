<template>
    <div class="chengxu">
        <div class="qiang">
            <ul class="ai">
                <li v-for="item in messageList" :key="item.id">
                    <!--ai-->
                    <div class="li_Ai" v-if="item.flag">
                        <div class="touxiang"><span class="mui-icon iconfont icon-jiqiren1"></span></div>
                        <div class="content">
                            <div class="time"><span>{{item.time|dataFormat}}</span></div>
                            <div class="myDiv">
                                
                                <div class="innerDiv">
                                    
                                </div>
                                
                                <p>{{item.content}}</p>
                            </div>

                        </div>
                    </div>
                    <!--user-->
                    <div class="li_Ai" v-if="!item.flag">
                        <div class="touxiang_User"><span class="mui-icon iconfont icon-geren"></span></div>
                        <div class="content">
                            <div class="time_User"><span>{{item.time|dataFormat}}</span></div>
                            <div class="myDiv_User">
                                
                                <div class="innerDiv_User">
                                    
                                </div>
                                
                                <p>{{item.content}}</p>
                            </div>

                        </div>
                    </div>

                </li>
                <li><br><br><br><br><br></li>
            </ul>
            <div ref="msg_end" style="height:0px; overflow:hidden"></div>
        </div>
        <div class="bianji">
            <input type="text" v-model="message" class="text" @keyup.enter="dealMessage"/>
        
            <mt-button type="primary" size="large" @click="dealMessage"
             class="btn">发送</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'chengxu',
    data(){
        return{
            messageList:[{id:this.content,flag:true,time:this.dataT,content:"快来和我聊聊天吧！"}],
                       
            message_ls:{},//临时储存数据
            message:'',//输入
            list:null,//接口返回数据
            dataT:null,//时间
            content:0,//id
        }
    },
    created(){
        this.dataT=new Date();
    },
    methods:{
        //发送事件
        dealMessage: function () {
            
            //将user消息添加至列表，消息墙
            this.pushMessageUser();
            //获取接口数据,将ai消息添加至消息墙
            this.getLT();
         },
        //获取接口数据
        getLT(){
            var lt={
                    "reqType":0,
                    "perception": {
                            "inputText": {
                                "text": this.message
                            }},
                    "userInfo": {
                            "apiKey": this.$store.state.key.tulin,
                            "userId": "123"
                        }}
            var lT=JSON.stringify(lt);
            this.$http.post("api_tuling",lT
                    ).then(
                (res)=>{
                    this.list=res.body.results[0].values.text;
                    this.message='';
                    console.log(this.list);
                    //将ai消息添加至消息墙
                    this.pushMessageAi();
                    this.$refs.msg_end.scrollIntoView();
                }).catch(function(){
                console.log("获取失败123");
                })
        },
        //将user消息添加至列表，消息墙
        pushMessageUser(){
            if(this.message!=""){
                this.content++
                this.dataT=new Date();
                this.message_ls={
                    id:this.content,
                    flag:false,
                    time:this.dataT,
                    content:this.message
                }
                this.messageList.push(this.message_ls);
            }
        },
        //将ai消息添加至消息墙
        pushMessageAi(){
            this.content++
            this.dataT=new Date();
            this.message_ls={
                id:this.content,
                flag:true,
                time:this.dataT,
                content:this.list
            }
            this.messageList.push(this.message_ls);
           
        }
    }
}
</script>
<style scoped>
    .chengxu{
        position:relative;
        height: 80%;
        overflow:scroll;
    }
    .cell{
        margin:1px;
    }
    div span{
        float: left;
        line-height: 40px;
        margin: 5px;
    }
    .bianji{
        position:fixed;
        bottom: 40px;
        display: flex;
       
        width: 400px;
    }
    @media screen and (max-width: 768px){
        .bianji{
            width: 100%;
        }
    }
    .text{
        width: 600px;
    }
    .qiang{
        height: 530px;
        
        overflow:scroll;
    }
    ul{
        list-style: none;
        
        
    }


    .li_Ai{
        position: relative;
        padding: 10px;
   
        overflow: hidden;
    }
    .myDiv{
        width:200px; 
        position: relative;
        top:7px;
        left: 30px;
        background-color:white;
        border-radius:10px;
        margin: 20px;
        padding-top: 5px;
    }
    .myDiv_User{
        float: right;
        width:200px; 
        position: relative;
        top:7px;
        right: 30px;
        background-color:rgb(0, 195, 255);
        border-radius:10px;
        margin: 20px;
        padding-top: 5px;

    }
    .myDiv_User p{
        color: white;
    }
    .innerDiv{
        margin-left:-9px;
        position: absolute;    
        top:2px;
        width:0;
        height:0;
        border-top:10px solid transparent;
        border-bottom:10px solid transparent;
        border-right:10px solid white;
    }
    .innerDiv_User{
        margin-right:-9px;
        position: absolute;    
        top:7px;
        right: 0;
        width:0;
        height:0;
        border-top:10px solid transparent;
        border-bottom:10px solid transparent;
        border-left:10px solid rgb(0, 195, 255);
    }
    p{
        color: black;
        text-align: left;
        padding-left: 10px;
        line-height: 20px;
    }
    .time{
        position:absolute;
        left: 60px;
        top: 0px;
    }
    .time_User{
        position:absolute;
        right: 60px;
        top: 0px;
    }
    span{
        font-size: 13px;
    }
    .touxiang span{
        position: absolute;
        left: 0px;
        top: 25px;
        font-size: 50px;
    }
     .touxiang_User span{
        position: absolute;
        right: 0px;
        top: 25px;
        font-size: 50px;
       
    }
</style>
