<template>
  <div id="app" class="container">
    <mt-header title="移动项目" class="header">
      <span  slot="left" @click="goBack" v-show="flag">
      <mt-button icon="back">返回</mt-button>
      </span>
  
    </mt-header>

    
    
    <transition>
      <router-view/>
    </transition>
    <router-link to="/" ref="tab1" id="tab1"></router-link>
     <router-link to="/chengxu" ref="tab2" id="tab2"></router-link>
      <router-link to="/gouwuche" ref="tab3" id="tab3"></router-link>
       <router-link to="/geren" ref="tab4" id="tab4"></router-link>
        <mt-tabbar v-model="selected" class="container footer">
        <mt-tab-item id="tab1"> 
        

        <img slot="icon" src="./icons/shouye.png">
        首页
        </mt-tab-item>
        <mt-tab-item id="tab2">
          <img slot="icon" src="./icons/jiqiren.png">
          机器人
        </mt-tab-item>
        <mt-tab-item id="tab3">
        <img slot="icon" src="./icons/listgouwu.png">
        购物车
        <div class="numb" id="badge"><p>{{$store.getters.zCount}}</p>
        
        </div>
        </mt-tab-item>
        <mt-tab-item id="tab4">
        <img slot="icon" src="./icons/geren.png">
          个人
        </mt-tab-item>
        </mt-tabbar>
   

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
      return {
        selected: 'tab1',
        n:0,
        flag:false,
        value:''
      }
    },
  created(){
        this.n=this.$store.getters.zCount;
        this.flag=this.$router.path==="/"?false:true;
         
  },
  mounted(){
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
  methods:{
        goBack(){
          this.$router.go(-1);
          this.selected=null;
        }
  },
  watch: {
      selected:function (val, oldVal) {
         if(val){
        document.getElementById(val).click();
         }
        //this.$refs.val.click();
        },
      "$route.path":function(val){
        if(val==="/"){
            this.flag=false;
        }else{
            this.flag=true;
        }
      }

   
  }
 
  

  
  }





</script>

<style>
*{
  margin:0;
  padding:0;
}
.header{
  z-index: 99;
}
 .v-enter{
   opacity:0;
   transform: translateX(100%);
  
 }
 .v-leave-to{
   opacity:0;
   transform: translateX(-100%);
   position: absolute;
 }
 .v-enter-active,
 .v-leave-active{
  transition: all 0.5s ease;
 }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 width: 400px;
  height:100%;
  
}

#Header{
    width: 100%;
    line-height: 50px;
    height: 50px;
    background-color:aqua; 
    }
.footer{
  width: 400px;
  z-index: 99;
}
@media screen and (max-width:768px ) {
    .footer{
      width: 100%;
    }
    #app {
      width: 100%;
    }
}
.numb{
      width: 20px;
      height: 20px;
      background-color: red;
      border-radius: 50%;
      position:absolute;
      top: 0;
      right:120px ;

     
}
.numb :last-child{

  color:aliceblue;
  display:block;
  position:absolute;
  top: 3px;
  right:5px ;
}
</style>
