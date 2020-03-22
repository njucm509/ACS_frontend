<template>
    <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px"
             class="login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="loginForm.account" auto-complete="off" aria-placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" v-model="loginForm.pwd" auto-complete="off" placeholder="密码"/>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%" @click.native.prevent="handleSubmit" :loading="logining">登录
        </el-button>
        <router-link to="/register">
          <el-button style="width: 100%">注册</el-button>
        </router-link>
      </el-form-item>
    </el-form>
</template>

<script>
  import {requestLogin} from "../axios/api";

  export default {
        name: "Login",
      data(){
          return{
            logining:false,
            loginForm:{
              //这是默认值
              account:'root1',
              pwd:'admin'
            },
            rules2:{
              account: [{
                required:true,
                message:'请输入账号',
                trigger:'blur'
              }],
              pwd:[{
                required: true,
                message: '请输入密码',
                trigger: 'blur'
              }]
            },
            checked:true
          }
      },
      methods:{
          handleSubmit(ev){
            this.$refs.loginForm.validate((valid)=>{
              if (valid){
                // console.log(this.$router.options);
                let loginParams = {
                  userName:this.loginForm.account,
                  userPassword:this.loginForm.pwd
                }
                requestLogin(loginParams).then(res=>{
                  console.log(res);
                  this.logining = true;
                  let data = res.data
                  console.log("data:"+data);
                  let code = res.status
                  console.log("code:"+code);
                  let msg = res.msg
                  console.log("msg:"+msg);
                  let user = data
                  console.log("userStatus:"+user.userStatus);
                  if(code==401){
                    this.$message({
                      message: '未授权用户',
                      type:'error'
                    });
                    this.logining = false
                  }
                  if(code ==404){
                    this.$message({
                      message: '未注册用户',
                      type:'error'
                    });
                    this.logining = false
                  }else {
                    sessionStorage.setItem('user',JSON.stringify(user));
                    console.log(JSON.parse(sessionStorage.getItem('user')))
                    this.$message({
                      message:'登录成功',
                      type:'success'
                    })
                    this.$router.push({
                      path:'/'
                    })
                  }
                })
              } else {
                console.log('error submit!!')
                this.logining = false
                return false
              }
            })
          }
      }
    }
</script>

<style scoped>
  .login-container {
    border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    margin: 180px auto;
    background-color: #FFFFFF;
    padding: 35px 35px 15px 35px;
    box-shadow: 0px 0px 25px #cac6c6;
  }

  .login-container .title {
    text-align: center;
    margin: 0px auto 40px auto;
  }

  .login-container .remember {
    margin: 0px auto 20px auto;
  }
</style>
