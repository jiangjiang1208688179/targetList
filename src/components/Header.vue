<template>
    <div class="header">
        <div class="systemName">
            <i class="el-icon-menu" style="color:white;margin-right:30px" @click="changeCollapse"></i>
            <span>xxx管理系统</span>
        </div>
        <div class="userInfo">
            <img class="userLogo" src="../assets/img/userlogo.jpg" alt="">
            <el-dropdown class="userName" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{username}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>我的</el-dropdown-item>
                    <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import bus from './bus.js'
export default {
  name: "cardBox",
  data() {
    return {
      username: "",
      isCollapse: false,
    };
  },
  methods: {
      changeCollapse(){
          this.isCollapse = !this.isCollapse;
          bus.$emit('isCollapse',this.isCollapse);
      },
    handleCommand(command) {
      if (command == "loginOut") { //退出登录，清空缓存，重定向到登录界面
        localStorage.removeItem("tgm-login");
        this.$router.push("/login");
      }
    },
    getUserName() {
      this.username = localStorage.getItem("tgm-login");
    }
  },
  mounted() {
    this.getUserName();
  }
};
</script>
<style scoped>
.header {
  height: 60px;
  background-color: black;
  line-height: 60px;
}
.systemName {
    color: white;
    font-size: 20px;
    position: absolute;
    left: 25px;
}
.userLogo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.userInfo {
  position: absolute;
  right: 50px;
  top: 10px;
}
.userName {
  margin-left: 10px;
  top: -15px;
  color: white;
}
.el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
</style>