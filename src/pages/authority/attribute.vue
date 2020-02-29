<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>列属性</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">新建</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
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
        <td class="text-xs-right">{{ props.item.attributeId }}</td>
        <td class="text-xs-right">{{ props.item.attributeName }}</td>
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
  import {getAttibuteList} from "../../axios/api";

  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: '编号', value: 'attributeId' },
        { text: '属性集', value: 'attributeName', sortable: false },
        { text: '操作', value: '', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        attributeId: '',
        attributeName: '',
      },
      defaultItem: {
        attributeName: '',
        attributeName: '',
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
        getAttibuteList().then(res=>{
          this.items = res.data
        })
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('确定删除！') && this.items.splice(index, 1)
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
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
