<template>
    <div>
        <router-link to="/user/userinfo">
            <div class="mui-card">
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner content">
                            <span>{{userId}}</span>
                            <span class="mui-icon iconfont icon-geren"></span>
                        </div>
                    </div>
                    <div class="mui-card-footer">
                        
                        <span>{{userTel}}</span>
                        <span class="mui-icon iconfont icon-erweima"></span>
                    </div>
            </div>
        </router-link>

        <mt-cell class="cellmoney">
            <div slot="icon" >
                <span class="mui-icon iconfont icon-qianbao"></span>
                <span>钱包</span>
            </div>
            <span v-show="flag">￥{{money}}</span>
            <span v-show="!flag"  >******</span>
            <button  @mousedown="yanjing()" class="mui-icon iconfont icon-yanjing" v-show="flag"></button>
            <button  @mouseup="yanjing()" class="mui-icon iconfont icon-yanjing-bi" v-show="!flag"></button>    
        </mt-cell>
        <mt-cell class="cell" to="" is-link>
            <div slot="icon" >
                <span class="mui-icon iconfont icon-hongbao"></span>
                <span>红包(待完成)</span>
            </div>
        </mt-cell>    
        <mt-cell class="cell" to="" is-link>
            <div slot="icon" >
                <span class="mui-icon iconfont icon-shoucang"></span>
                <span>收藏(待完成)</span>
            </div>
        </mt-cell>
        <mt-cell class="cell" to="" is-link>
            <div slot="icon" >
                <span class="mui-icon iconfont icon-dingdan"></span>
                <span>订单(待完成)</span>
            </div>
        </mt-cell>
        <mt-cell class="cell" to="/user/chongzhi" is-link>
            <div slot="icon" >
                <span class="mui-icon iconfont icon-3"></span>
                <span>充值</span>
            </div>
        </mt-cell>
    </div>

</template>
<script>
import { Toast } from 'mint-ui';
export default {
    name:'user',
    data(){
        return{
            userTel:this.$store.state.userInfo.userSession.userTel,
            userId:this.$store.state.userInfo.userSession.userId,
            money:this.$store.state.userInfo.userSession.money,
            flag:false
        }
    },
    methods:{
        yanjing(){
            this.flag=!this.flag;
        },

    }
}
</script>
<style scoped>
    .content{
        display: flex;
        justify-content: space-between;
    }
    div span{
        float: left;
        line-height: 40px;
        margin: 5px;
    }
    button{
        outline:none;
        border: none;
    }
    .cellmoney{
        margin-bottom:10px;
    }
    .cell{
        margin-bottom:1px;
    }
</style>
