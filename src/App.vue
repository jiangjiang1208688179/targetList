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
        <el-main>
          <home></home>
        </el-main>
       </el-container>
    </el-container>
  </div>
</template>
<script>
  import Home from './views/Home.vue'
  export default {
    components:{
      Home
    },
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);  //此处可以直接设置导航跳转路径
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
