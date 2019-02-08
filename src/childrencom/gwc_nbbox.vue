<template>
    <div class="mui-numbox" data-numbox-min="0">
          <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
          <input id="test" class="mui-input-numbox" type="number" :value="count"
           @change="countchenged" ref="number">
         <button class="mui-btn mui-btn-numbox-plus" type="button" disabled="">+</button>
    </div>
</template>
<script>
import mui from '../../lib/mui/dist/js/mui.min.js'
export default {
    name:'numberbox',
    data(){
        return{
            max123:10,
            count:null
        };
    },
    props:['itemid'],
    created(){
        //初始化数量
        this.select();
        
    },
    mounted(){
        mui(".mui-numbox").numbox();
    },
    methods:{
            countchenged(){
                this.$emit('getvalue',this.$refs.number.value);
                
                const goodsinfo={id:this.itemid,count:this.$refs.number.value };
                this.$store.commit("changeCarCount",goodsinfo); 
                const badge= document.getElementById("badge");

                badge.innerHTML="<p>"+this.$store.getters.zCount+"</p>";
                const zC=this.$store.getters.zCount;
                if(zC>=10){
                   badge.lastChild.style.right="2px";
                }
                else{
                   badge.lastChild.style.right="5px";
                }
            },

            select(){
              this.count= this.$store.getters.selectGoods(this.itemid);
            
            },
           
    }
}
</script>
<style scoped>

</style>
