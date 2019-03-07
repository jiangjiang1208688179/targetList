<template>
    <div>
        <el-container>
            <el-header><v-header></v-header></el-header>
            <el-container>
                <el-aside width="200px" id="asideWidth" ><v-sideBar></v-sideBar></el-aside>
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
        <!-- <v-header></v-header>
        <v-sideBar></v-sideBar>
        <router-view></router-view> -->
    </div>
</template>
<script>
import vHeader from "../components/Header.vue";
import vSideBar from "../components/Sidebar.vue";
import bus from "../components/bus.js"
export default {
  name: "home",
  components: { vHeader, vSideBar },
  data() {
    return {
        isCollapse: false
    };
  },
  mounted(){
      bus.$on('isCollapse',(msg) => {
          var aa = document.getElementById('asideWidth');
          this.isCollapse = msg;
          if(msg){
              aa.style.width = "65px";
          } else{
              aa.style.width = "200px";
          }
      })
  }
};
</script>
<style scoped>
.el-header, .el-footer {
    background-color: rgb(3, 4, 7);
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    /* background-color: #D3DCE6; */
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>