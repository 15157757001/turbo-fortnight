<template>
    <fieldset>
        <legend>修改密码</legend>
        <div>
                <label>手机号码：</label>
                <input type="tel" name="userPhone" v-model="tel" autocomplete="off" 
                required id="tel" @keyup="checkTelFlag()">
                <div :class="telFlag?'imgTure':'imgFalse'"></div>
        </div>
        <div>
                <label>新密码：</label>
                <input type="password" name="userPassword" id="pwd" autocomplete="off" 
                required @keyup="checkLength()" v-model="userPassword">
                <div :class="pwdFlag?'imgTure':'imgFalse'"></div>
        </div>
        <div>
                <label>确认密码：</label>
                <input type="password" id="pwd2" required @keyup="checkPsw()" v-model="userPassword2">
                <div :class="pwd2Flag?'imgTure':'imgFalse'"></div>
        </div>
            
        <div>
                <label>密码强度：</label>
                <meter max="100" min="10" low="45" :value="meterL"></meter>
                <label class="pswInfo">{{pswInfo}}</label>
        </div>
        <mt-button type="primary" size="large" @click="wUserPwd()">修改</mt-button>
    </fieldset>    
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    name:'wangji',
    data(){
        return{
            pwdFlag:false,
            pwd2Flag:false,
            telFlag:false,
            tel:"",
            meterL:10,
            userPassword:"",
            userPassword2:"",
            pswInfo:""
        }
    },
    methods:{
        //检测号码存在
        checkTelFlag(){
             this.telFlag=!this.$store.getters.readUserTel(this.tel);
        },
        //新密码条件
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
        //确认密码
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
        //修改密码
        wUserPwd(){
              if(this.pwdFlag&&this.pwd2Flag&&this.telFlag==true){
                var userInfo={
                    userPassword:this.userPassword,
                    userTel:this.tel
                };
             
                this.$store.commit("writePwdByTel",userInfo);
            
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
        reset(){
            this.userPassword="";
            this.userPassword2=null;
            this.tel=null;
            this.pswInfo="";
            this.pwdFlag=false;
            this.pwd2Flag=false;
            this.telFlag=false;
            var inputV= document.getElementsByTagName('input');
            for(let i=0;i<inputV.length-2;i++){
                inputV[i].value=null;
            }  
            this.meterL=10;
        },
        
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
</style>
