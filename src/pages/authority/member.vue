<template>
  <v-data-table
    :headers="headers"
    :items="AllUser"
    sort-by="userId"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>用户</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.userId" label="userId"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.userName" label="userName"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.userPassword" label="userPassword"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.userDepartment" label="userDepartment"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.userCompany" label="userCompany"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.userStatus" label="userStatus"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">取消</v-btn>
              <v-btn color="blue darken-1" text @click="save">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">刷新</v-btn>
    </template>
  </v-data-table>
</template>
<script>
  import {getUserList} from "../../axios/api";

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {text: '编号',value: 'userId',},
        { text: '姓名', value: 'userName' },
        { text: '密码', value: 'userPassword' },
        { text: 'IP地址', value: 'userIP' },
        { text: '部门', value: 'userDepartment' },
        { text: '公司', value: 'userCompany' },
        { text: '状态', value: 'userStatus' },
        { text: '操作', value: 'action', sortable: false },
      ],
      AllUser: [
        {
          userId:'a',
          userName:'a',
          userPassword:'a',
          userIP:'a',
          userDepartment:'a',
          userCompany:'a',
          userStatus:'a'
        }

      ],//这个变量用来表示全部数据
      editedIndex: -1,
      editedItem: {
        userId: '',
        userName: 0,
        userPassword: 0,
        userIP: '',
        userDepartment: '',
        userCompany:'',
        userStatus:''
      },
      defaultItem: {
        userId: '',
        userName: 0,
        userPassword: 0,
        userIP: '',
        userDepartment: '',
        userCompany:'',
        userStatus:''
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新建' : '编辑'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        getUserList().then(res=>{
          this.AllUser = JSON.stringify(res.data)
          // console.log(res.data);
          // console.log(this.AllUser);
          console.log(typeof this.AllUser);
        })
      },

      editItem (item) {
        this.editedIndex = this.AllUser.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.AllUser.indexOf(item)
        confirm('确认删除此条！') && this.AllUser.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.AllUser.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
