<template>
    <div class="sidebar">
        <!-- <div>
            <div v-show="isCollapse" @click="controlSideBar">展开</div>
            <div v-show="!isCollapse" @click="controlSideBar">关闭</div>
        </div> -->
        <el-menu default-active="1-2" class="el-menu-vertical-demo" :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                <el-menu-item-group>
                    <span slot="title">分组一</span>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
import bus from './bus'
export default {
  name: "sideBar",
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
  },
  mounted(){
      bus.$on('isCollapse', msg => { //放在mounted或者created中都是可以的，实现兄弟组件间传值
          this.isCollapse = msg;
      })
  }
};
</script>
<style scoped>
/* 左侧导航栏充满最左侧 */
.sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 60px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    } 
     .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>