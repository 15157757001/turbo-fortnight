<template>
    <div class="navi">
        <div class="title">
            <label>充值金额</label>
            
        </div>
        <div class="div-bor"> 
            <span class="bor">￥</span>
            <input type="tel" autocomplete="off" class="tel" 
            v-model="money">
        </div>
        <mt-button type="primary" size="large" @click="chongzhi()">立即充值</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
    name:"chongzhi",
    data(){
        return{
            money:""
        }
    },
    methods:{
        //充值
        chongzhi(){
            var userInfo={
                id:this.$store.state.userInfo.userSession.userId,
                money:this.money
                
            }
            var reg=/^[1-9]\d*.\d*|0.\d*[1-9]\d*$/;
            if(reg.test(this.money)){
                this.$store.commit('addUpMoney',userInfo);
                let instance=Toast({
                    message: '充值成功',
                    iconClass: 'mui-icon iconfont icon-duigou'
                });
                setTimeout(() => {
                    instance.close();
                }, 1400);
            }
            else{
                let instance=Toast({
                    message: '请输入正确的数值',
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
    .navi{
        
        padding: 5px;
    }
    .title{
        display: flex;
        padding: 10px;
    }
    label{
        font-size: 25px;
    }
    .div-bor{
        position: relative;
        font-size: 40px;
        line-height: 40px;
    
    }
    .tel{
        height: 50px;
        padding-left: 40px;
        font-size: 40px;
    }
    .bor{
        position: absolute;
        top:px;
     
    }
</style>
