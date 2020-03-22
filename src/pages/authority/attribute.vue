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
              <el-select v-model="selectAttribute" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
    <v-data-table :headers="headers" :items="items" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>
          <div>
            <el-tag v-for="item in props.item.names"
                    :key="item" style="margin: 2px">
              {{item | filterName}}
            </el-tag>
          </div>
        </td>
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
  import {addAttribute, deleteAttribute, getAttributeList} from "../../axios/api";
  import map from "../../storage/map";

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {text: '编号', value: 'attributeId'},
        {text: '属性集', value: 'attributeName', sortable: false},
        {text: '操作', value: '', sortable: false}
      ],
      selectAttribute:[],
      options: [{
        value: 'name',
        label: '姓名'
      }, {
        value: 'sex',
        label: '性别'
      }, {
        value: 'birthday',
        label: '出生日期'
      }, {
        value: 'hospital',
        label: '就诊医院'
      }, {
        value: 'department',
        label: '部门'
      }, {
        value: 'attending_doctor',
        label: '主治医生'
      }, {
        value: 'medical_insurance',
        label: '医保'
      }, {
        value: 'date_of_consultation',
        label: '就诊状况'
      }, {
        value: 'visiting_status',
        label: '就诊状况'
      }, {
        value: 'complaints',
        label: '病诉'
      }, {
        value: 'seriousness',
        label: '轻重程度'
      }, {
        value: 'medical_history',
        label: '病史'
      }, {
        value: 'speciality_check_up',
        label: '专科检查'
      }, {
        value: 'drug_use',
        label: '用药'
      }, {
        value: 'release_time',
        label: '发布时间'
      }],
      items: [],
      editedIndex: -1,
      editedItem: {
        attributeId: '123',
        attributeName: '无权限',
      },
      defaultItem: {
        attributeId: '',
        attributeName: '',
      }
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? '新建' : '编辑'
      },
    },

    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    filters: {
      filterName(value) {
        if (map[value] == null) {
          return value;
        }
        return map[value];
      }
    },

    created() {
      this.initialize()
    },

    methods: {
      initialize() {
        getAttributeList().then(res => {
          console.log(res);
          this.items = res.data
        })
      },

      editItem(item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.items.indexOf(item)
        confirm('确定删除！') && this.items.splice(index, 1)&&deleteAttribute(item).then(res=>{
          console.log(res.data)
        })
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex].names, this.editedItem)
        } else {
          addAttribute(this.selectAttribute).then(res=>{
            
          })
        }
        this.close()
      }
    }
  }
</script>
