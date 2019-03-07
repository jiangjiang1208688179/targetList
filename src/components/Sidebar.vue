<template>
    <div class="sidebar">
        <!-- <div>
            <div v-show="isCollapse" @click="controlSideBar">展开</div>
            <div v-show="!isCollapse" @click="controlSideBar">关闭</div>
        </div> -->
        <el-menu default-active="1-1" :unique-opened="true" class="el-menu-vertical-demo" :collapse="isCollapse"
            @select="handleSelect" @open="handleOpen" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">目标管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">目标管理首页</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">Echart图标</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1">点状分布图</el-menu-item>
                    <el-menu-item index="2-2">折线图</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">常见table管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1">表单分页</el-menu-item>
                    <el-menu-item index="3-2">表单查询、排序</el-menu-item>  <!--查询分为：1、点选查询，2、输入关键字查询-->
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
        activeIndex:'1-1',
        isCollapse: false
    };
  },
  methods: {
      handleSelect(key, keyPath){ //左边导航菜单（控制右边内容栏显示的页面）
          console.log(key)
          if(keyPath[0] == '1'){
              if(keyPath[1] == '1-2'){
                  console.log('1-2')
                  this.$router.push({path:'/'})
              } else{
                  console.log('other')
                  this.$router.push({path: '/'})
              }
          }else if(keyPath[0] == '2'){
              if(keyPath[1] == '2-1'){
                  this.$router.push({path: '/echart'})
              } else if(keyPath[1] == '2-2'){
                  this.$router.push({path: '/echart/line'})
              }

          } else if(keyPath[0] == '3'){
              if(keyPath[1]== '3-1'){
                  console.log('3-1')
                  this.$router.push({path: '/table'})
              } else if(keyPath[1] == '3-2'){
                  this.$router.push({path: '/table-2'})
              }
          }
        //   console.log('aa',keyPath);
      },
      handleOpen(key, keyPath){
          console.log(key,keyPath)
      }
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    text-align: left;
  }
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