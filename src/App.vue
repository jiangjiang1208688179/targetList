<template>
  <div id="app">

    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1"><router-link to="/">今日计划</router-link> |</el-menu-item>
          <el-menu-item index="2"><router-link to="/tomorrow">明日计划</router-link></el-menu-item>
          <el-menu-item index="3" ><router-link to="/week">本周计划</router-link></el-menu-item>
          <el-menu-item index="4"><router-link to="/thisMonth">本月计划</router-link></el-menu-item>
          <el-menu-item index="5"> <router-link to="/waitPlain">待安排计划</router-link></el-menu-item>
        </el-menu>
        <router-view/>
      </el-header>
      <el-container>
        <el-aside width="200px" style="border-top:1px solid #ccc; height:90vh; border-right: 1px solid #ccc">
          <el-row :span="12">
            <el-menu default-active="1" class="el-menu-vertical-demo"   @close="handleClose"
  active-text-color="#ffd04b">
              <el-menu-item index="1"> 
                <i class="el-icon-menu"></i>
                <span slot="title">待完成</span>
              </el-menu-item>
              <el-menu-item index="2"> 
                <i class="el-icon-menu"></i>
                <span slot="title">已完成</span>
              </el-menu-item>
              <el-menu-item index="3"> 
                <i class="el-icon-menu"></i>
                <span slot="title">所有列表</span>
              </el-menu-item>
            </el-menu>
          </el-row>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);  //此处可以直接设置导航跳转路径
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
