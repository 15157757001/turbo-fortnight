<template>
    <div>
        <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner content">
                                <mt-cell title="用户名" class="cell" :value="userId">
         
                                </mt-cell>          
                                <mt-cell title="手机号" class="cell" :value="userTel">
         
                                </mt-cell>
                    </div>
                </div>
        </div>
  
     
        <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner content">
                            <span>个人二维码</span>
                        
                    </div>
                </div>
                <div class="mui-card-footer footerImg">
                         <img :src="img_url">
                </div>
        </div>
        <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner content">
                            <mt-button type="danger" size="large" @click="zhuxiao()">注销</mt-button>
                        
                    </div>
                </div>
        </div>

    </div>    
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    name:'userinfo',
    data(){
        return{
            userTel:this.$store.state.userInfo.userSession.userTel,
            userId:this.$store.state.userInfo.userSession.userId,
            img_url:'http://apis.juhe.cn/qrcode/api?text=&el=&bgcolor=&fgcolor=&logo=&w=250&m=10&lw=&type=2&key='+this.$store.state.key.qrcode
        }
    },
    created(){
        if(sessionStorage.getItem('user')!='[]'&&sessionStorage.getItem('user')){
           
        }
        else{
            this.$router.push({name:'geren'});
        }
    },
    methods:{
       zhuxiao(){
           this.$store.commit('cancelUser');
           this.$router.push({name:'geren'});
            let instance=Toast({
                message: '注销成功',
                iconClass: 'mui-icon iconfont icon-duigou'
            });
            setTimeout(() => {
                instance.close();
            }, 1400);
       }
    }
}
</script>
<style scoped>

    div{
        text-align:left;

    }
    img{
        margin: 0 auto;
    }
</style>
