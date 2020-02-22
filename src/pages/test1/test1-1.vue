<template>
  <v-card class="px-5">
    <v-form v-model="valid" ref="myForm">
      <v-text-field v-model="item.userId" label="账号：" disabled/>
      <v-text-field v-model="item.userName" label="真实姓名：" required :rules="nameRules"/>
      <v-text-field v-model="item.userPassword" label="密码：" required :rules="pwdRules"/>

      <!--    <v-layout row>-->
      <!--      <v-flex xs3>-->
      <!--        <span style="font-size: 16px; color: #444">头像：</span>-->
      <!--      </v-flex>-->
      <!--      <v-flex>-->
      <!--        <v-upload v-model="user.image" url="/upload/image" :multiple="false" :pic-width="250" :pic-height="90"/>-->
      <!--      </v-flex>-->
      <!--    </v-layout>-->
      <v-layout class="my-4" row>
        <v-spacer/>
        <v-btn @click="submit" color="primary">修改</v-btn>
        <v-btn @click="clear">重置</v-btn>
      </v-layout>
    </v-form>
  </v-card>
</template>

<script>
    export default {
        data() {
            return {
                userList: [],
              valid: false,
              item: {
              },
              nameRules: [
                v => !!v || "名称不能为空",
              ],
              accountRules: [
                v => !!v || "账号不能为空",
                // v => /^[a-zA-Z]{1}$/.test(v) || "品牌字母只能是1个字母"
                v => v.length > 4 || "账号至少5位"
              ],
              pwdRules: [
                v => !!v || "密码不能为空",
                v => v.length > 4 || "密码至少5位"
              ]
            }
        },
        methods: {
            getData() {
                this.$http.get('/user/list').then(res => {
                    console.log(res)
                    sessionStorage.setItem('user','c')
                })
            },
          submit() {

          },
          clear() {

          }
        },
        mounted() {
            this.getData();
            this.item = JSON.parse(sessionStorage.getItem('user'))
        }
    }
</script>

<style>
</style>
