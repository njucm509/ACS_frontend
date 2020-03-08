<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>用户</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">创建</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
<!--                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.userId" label="编号" disabled></v-text-field>
                </v-flex>-->
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.userName" label="用户名"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.userPassword" label="密码"></v-text-field>
                </v-flex>
<!--                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.userIP" label="IP地址" disabled></v-text-field>
                </v-flex>-->
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.userDepartment" label="部门"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.userCompany" label="公司"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
<!--                  <v-text-field v-model="editedItem.userStatus" label="状态"></v-text-field>-->
                  <el-radio v-model="editedItem.userStatus" label="正常">正常</el-radio>
                  <el-radio v-model="editedItem.userStatus" label="停用">停用</el-radio>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">取消</v-btn>
            <v-btn color="blue darken-1" flat @click="save">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.userId }}</td>
        <td class="text-xs-left">{{ props.item.userName }}</td>
        <td class="text-xs-left">{{ props.item.userPassword }}</td>
        <td class="text-xs-left">{{ props.item.userIP }}</td>
        <td class="text-xs-left">{{ props.item.userDepartment }}</td>
        <td class="text-xs-left">{{ props.item.userCompany }}</td>
        <td class="text-xs-left">{{ props.item.userStatus }}</td>
        <td class="justify-left layout px-0">
          <v-btn icon class="mr-2" @click="editItem(props.item)">
            <i class="el-icon-edit"/>
          </v-btn>
          <v-btn icon @click="deleteItem(props.item)">
            <i class="el-icon-delete"/>
          </v-btn>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">刷新</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import {addUser, deleteUser, editUser, getIP, getUserList} from "../../axios/api";

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {text: '编号',value: 'userId'},
        { text: '姓名', value: 'userName',sortable: false },
        { text: '密码', value: 'userPassword',sortable: false },
        { text: 'IP地址', value: 'userIP',sortable: false },
        { text: '部门', value: 'userDepartment',sortable: false},
        { text: '公司', value: 'userCompany', sortable: false },
        { text: '状态', value: 'userStatus', sortable: false },
        { text: '操作', value: '', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        userId:'',
        userName: '',
        userPassword:'',
        userIP:'127.0.0.1',//默认值IP为127.0.0.1
        userDepartment:'',
        userCompany:'',
        userStatus:'',
      },
      defaultItem: {
        userName: '',
        userPassword:'',
        userIP:'',
        userDepartment:'',
        userCompany:'',
        userStatus:'',
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新建' : '编辑'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },


    methods: {
      initialize () {
        getUserList().then(res=>{
          // console.log("打印查询到的所有用户"+res.data);
          this.items = res.data
        })
        //将本机IP赋给编辑框的userIP,传入后台
        this.editedItem.userIP = getIP()
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        console.log(index);
        console.log(item)
        confirm('确认要删除！') && this.items.splice(index, 1)&&deleteUser(item).then(res=>{
          //打印删除的数据
          console.log(res)
        })
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
          //修改
          Object.assign(this.items[this.editedIndex], this.editedItem)
          editUser(this.editedItem).then(res=>{
            console.log(res)
          })
        } else {
          //新建
          addUser(this.editedItem).then(res=>{
            if (res.status==200){
              this.items.push(res.data)
            }else{
              confirm("插入失败!")//提示插入失败
            }
            console.log(res);
          })

        }
        this.close()
      }
    }
  }
</script>
