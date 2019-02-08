<template>
    <div>
        <div class="login">
            <div><h1>欢迎登录</h1><span></span></div>
            <div>
                <label>用户名：</label>
                <input type="text" id="userName" placeholder="请输入用户名" autocomplete="off" 
                class="xxinput" v-model="userId"></div>
            <div>
                <label>密码：</label>
                <input type="password"  id="userPass" placeholder="请输入密码" 
                class="xxinput" v-model="userPassword" @keyup.enter="denlu">
                </div>
            <div class="zc">
                <router-link to="/geren/zhuce">注册账号</router-link>
                <router-link to="/geren/wangji">忘记密码？</router-link>
            </div>
            <mt-button type="primary" size="large" @click="denlu">登录</mt-button>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    name:'geren',
    data(){
        return{
            userId:'',
            userPassword:''
        }
    },
    
    created(){
        if(sessionStorage.getItem('user')!='[]'&&sessionStorage.getItem('user')){
            this.$router.push({name:'user'});
        }
    },
    methods:{
        denlu(){
            var userInfo={
                userId:this.userId,
                userPassword:this.userPassword
            }
            var loginTF= this.$store.getters.login(userInfo);
            //判断登录是否成功
            if(loginTF){
                
                let instance=Toast({
                        message: '登录成功',
                        iconClass: 'mui-icon iconfont icon-duigou'
                });
                setTimeout(() => {
                        instance.close();
                }, 1400);
                this.$router.push({name:'user'});
            }
            else{
                let instance=Toast({
                        message: '密码错误',
                        iconClass: 'mui-icon iconfont icon-guanbi'
                });
                setTimeout(() => {
                        instance.close();
                }, 1400);                
            }
        }
    }  
}
</script>
<style scoped>
.login{
   
    height: 200px;
  
    padding: 10px;
    margin: 40% 0;
    
}
.login div:nth-of-type(n){
    
    width: 300px;
    display: flex;

    margin: 10px auto;
    
}
input{
    height: 30px;
}
label{
    font-size:18px ;
    width: 100px;
    line-height: 30px;
}
.zc{
    display: flex;
    justify-content:space-between;
    
}
.zc span{
   
    font-size:13px;
}
</style>
