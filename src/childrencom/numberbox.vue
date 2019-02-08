<template>
    <div class="mui-numbox" data-numbox-min="0" data-numbox-max="10">
          <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
          <input id="test" class="mui-input-numbox" type="number" v-model="val"
           @change="countchenged" ref="number">
         <button class="mui-btn mui-btn-numbox-plus" type="button" disabled="">+</button>
    </div>
</template>
<script>
import mui from '../../lib/mui/dist/js/mui.min.js'
export default {
    name:'numberbox',
    props:['count123'],
    data(){
        return {
            val:0
        }
    },
    mounted(){
        mui(".mui-numbox").numbox();
    },
    methods:{
            countchenged(){
              
                this.$emit('getcount',this.$refs.number.value);
                //mui(".mui-numbox").numbox().setOption('max123',10);
            },
          
            
    },
    watch:{
            'count123':function(newVal,oldVal){
                this.val=newVal;
            }
        }
}
</script>
<style scoped>

</style>
