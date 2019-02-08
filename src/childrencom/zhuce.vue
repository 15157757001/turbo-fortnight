<template>
    <form action="" class="container">
        <fieldset>
            <legend>注册账号</legend>
            <div>
                <label>用户名：</label>
                <input type="text" name="userName" required autofocus 
                v-model="userId" @keyup="checkIdFlag()" autocomplete="off">
                <div :class="idFlag?'imgTure':'imgFalse'"></div>
            </div>
            <div>
                <label>密码：</label>
                <input type="password" name="userPassword" id="pwd" autocomplete="off" 
                required @keyup="checkLength()" v-model="userPassword">
                <div :class="pwdFlag?'imgTure':'imgFalse'"></div>
            </div>
            <div>
                <label>确认密码：</label>
                <input type="password" id="pwd2" required @blur="checkPsw()" v-model="userPassword2">
                <div :class="pwd2Flag?'imgTure':'imgFalse'"></div>
            </div>
            
            <div>
                <label>密码强度：</label>
                <meter max="100" min="10" low="45" :value="meterL"></meter>
                <label class="pswInfo">{{pswInfo}}</label>
            </div>
            
            
            <div>
                <label>手机号码：</label>
                <input type="tel" name="userPhone" v-model="tel" autocomplete="off" 
                required id="tel" @keyup="checkTelFlag()">
                <div :class="telFlag?'imgTure':'imgFalse'"></div>
            </div>
            <div>
                <input type="button" value="提交" class="button" @click="submit()"> 
                <input type="button" value="重置" class="button" @click="reset()">
            </div>
            
        </fieldset>
        
    </form>
</template>
<script>

import { Toast } from 'mint-ui';
export default {
    name:'zhuce',
    data(){
        return{
            userId:null,
            userPassword:"",
            userPassword2:null,
            tel:null,
            meterL:10,
            pswInfo:"",
            idTag:"X",
            idFlag:false,
            pwdFlag:false,
            pwd2Flag:false,
            telFlag:false

        }
    },
    methods:{
        checkPsw(){
            if(this.userPassword.length<6){
                this.pswInfo="密码过短";
                this.pwd2Flag=false;
            }
            else if(this.userPassword===this.userPassword2)
            {
                this.pswInfo="";
                this.pwd2Flag=true;
            }
            else{
                this.pswInfo="两次密码不同";
                this.pwd2Flag=false;
            }
        },
        checkLength(){

            //重置度量
            this.meterL=10;
            //根据正则，增加度量
            if (/\d/.test(this.userPassword)) this.meterL=this.meterL+25; //数字
            if (/[a-z]/.test(this.userPassword)) this.meterL=this.meterL+25; //小写
            if (/[A-Z]/.test(this.userPassword)) this.meterL=this.meterL+25; //大写  
            if (/\W/.test(this.userPassword)) this.meterL=this.meterL+25; //特殊字符
            
            if(this.userPassword.length<6){
                this.pswInfo="密码过短";
                this.pwdFlag=false;
            }else{
                this.pswInfo="";
                this.pwdFlag=(this.meterL>10?true:false);
            }
        },
        reset(){
            this.userId=null;
            this.userPassword="";
            this.userPassword2=null;
            this.tel=null;
            this.pswInfo="";
            this.idFlag=false;
            this.pwdFlag=false;
            this.pwd2Flag=false;
            this.telFlag=false;
            var inputV= document.getElementsByTagName('input');
            for(let i=0;i<inputV.length-2;i++){
                inputV[i].value=null;
            }  
            this.meterL=10;
        },
        submit(){

            if(this.idFlag&&this.pwdFlag&&this.pwd2Flag&&this.telFlag==true){
                var userInfo={
                    userId:this.userId,
                    userPassword:this.userPassword,
                    userTel:this.tel
                };
             
                this.$store.commit("addToUser",userInfo);
                console.log(this.$store.state.userInfo.user);
                this.reset();
                let instance=Toast({
                    message: '操作成功',
                    iconClass: 'mui-icon iconfont icon-duigou'
                });
                setTimeout(() => {
                    instance.close();
                }, 1400);
            }
           
        },
        //用户ID按键事件，改变idflag
        checkIdFlag(){
            
            this.idFlag=this.$store.getters.readUserId(this.userId);
        },
        checkTelFlag(){
            var reg=/^1[34578]\d{9}$/;
             
            this.telFlag=reg.test(this.tel)&&this.$store.getters.readUserTel(this.tel);
        }

    }

}
</script>
<style scoped>
    fieldset{
        display: flex;
        margin: 30% 0;
    }
    legend{
        font-size:20px;
        
    }
    input{
        width: 200px;
        height: 20px;
    }
    label{
        line-height: 20px;
        width: 100px;
        text-align: right;
    }
    .button{
        height: 30px;
        width: 150px;
        margin: 10px;
    }
    fieldset div{
        padding: 5px;
        display: flex;
        margin-left: 10px;
    }
    meter{
        width: 100px;
    }
   
    .pswInfo{
        color: red;
        font-size: 13px;
    }
    .imgTure{
        background: url('../assets/imgT.jpg') no-repeat;
        width: 20px;
        height: 20px;
    }
    .imgFalse{
        background: url('../assets/imgF.jpg') no-repeat;
        width: 20px;
        height: 20px;
    }
    span{
        color: red;
        width: 20px;
        height: 20px;
    }
</style>
