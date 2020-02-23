<template>
  <el-form :model="registerForm" :rules="rules2" ref="registerForm" label-position="left" label-width="0px"
           class="register-container">
    <h3 class="title">系统注册</h3>
    <el-form-item prop="name">
      <el-input type="text" v-model="registerForm.userName" auto-complete="off" placeholder="真实姓名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="registerForm.userPassword" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="userDepartment">
      <el-input type="text" v-model="registerForm.userDepartment" auto-complete="off" placeholder="部门"></el-input>
    </el-form-item>
    <el-form-item prop="userCompany">
      <el-input type="text" v-model="registerForm.userCompany" auto-complete="off" placeholder="单位"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit">注册
      </el-button>
      <router-link to="/login">
        <el-button  style="width: 100%;">返回</el-button>
      </router-link>
    </el-form-item>
  </el-form>

</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        registerForm: {
          userName: '',
          userPassword: '',
          userIP:'',
          userDepartment:'',
          userCompany:''
        },
        rules2: {
          userName: [{
            required: true,
            message: '请输入真实姓名',
            trigger: 'blur'
          }
          ],
          userPassword: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
          ],
          userDepartment: [{
            required: true,
            message: '请输入所属部门',
            trigger: 'blur'
          }
          ],
          userCompany: [{
            required: true,
            message: '请输入工作单位',
            trigger: 'blur'
          }
          ]
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            this.$http.post('/user/add', this.registerForm).then((res => {
              console.log(res.data)
              let user = res.data;
              sessionStorage.setItem('user', JSON.stringify(user));
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.$router.push({
                path: '/'
              })
            }))
          }
        })
      },
    },
    created() {
      let cip = returnCitySN["cip"]
      this.registerForm.userIP = cip
      console.log(this.registerForm)
      console.log(cip);
    }
  }
</script>

<style scoped>
  .register-container {
    border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    margin: 180px auto;
    background-color: #FFFFFF;
    padding: 35px 35px 15px 35px;
    box-shadow: 0px 0px 25px #cac6c6;
  }

  .register-container .title {
    text-align: center;
    margin: 0px auto 40px auto;
  }
</style>
