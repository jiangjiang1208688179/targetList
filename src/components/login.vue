<template>
  <div class="login">
    <div>
      <div class="tgm-login">
      <el-form :model="loginForm" :rules="checkLogin" ref="loginForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input type="password" v-model="loginForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
           <!--此处@keyup.enter.native="",为何变成@keyup.enter=""不行呢？-->
          <el-input v-model.number="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></el-input> 
        </el-form-item>
        <el-form-item class="tgm-loginButton">
          <el-button style="margin-left:90px" type="primary" @click="submitForm('loginForm')">提交</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
  </div>
</template>
<script>
export default {

  data() {
    var checkName = (rule, value, callback) => {
      if (!value){
        return callback(new Error('用户名不能为空'))
      } else {
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空，请输入有效密码'))
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        name: "123",
        password: "5989"
      },
      checkLogin: {
        name: [
          {validator: checkName, trigger: 'blur'}  //另外一种写法：添加required:true字段，validator字段后边可以直接接提示字符串
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formname) {
      this.$refs[formname].validate((valid)=>{
        if (valid){  //判断表单校验是否通过，通过了，就执行xxx
          localStorage.setItem('tgm-login',this.loginForm.name);
          this.$router.push('/');
          // alert('submit');
        } else {  //未通过表单校验，执行xxx
          console.log('error submite');
          return false;
        }
      });
    },
    resetForm(formname) {
      this.$refs[formname].resetFields();
    }
  }
};
</script>
<style scoped>
.login{
  width: 100vw;
  height: 100vh;
/* background-color: black; */
background-image:url('../assets/login-bg.jpg')
}
.tgm-login{
  padding: 20px;
  width: 400px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top:-200px;
  margin-left: -200px;
  background-color: #ddccaa88;
}
</style>