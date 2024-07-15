<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline" class="user-headers">
      <el-form-item label="输入">
        <el-input v-model="formInline.keyword" placeholder="输入用户名" />
      </el-form-item>
      <!-- </el-form-item>
    <el-form-item label="Activity time">
      <el-date-picker
        v-model="formInline.date"
        type="date"
        placeholder="Pick a date"
        clearable
      />
    </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" style="width: 100%" height="500px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
      />

      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- total:该table总共条数据 page-size:一个page多少数据，最后分页栏会通过计算，total / page-size 得到最大页面数 -->
    <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="config.total"
      @current-change="changePage"
      class="pager"
    />
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action === 'add' ? '新增用户' : '编辑用户'"
    width="50%"
    :before-close="handleClose"
  >
    <el-form
      :inline="true"
      :model="formUser"
      ref="userForm"
      class="demo-form-inline"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="name"
            :rules="[{ required: true, message: '姓名是必填项' }]"
          >
            <el-input
              v-model="formUser.name"
              placeholder="输入姓名"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="年龄"
            prop="age"
            :rules="[
              { required: true, message: '年龄是必填项' },
              // 注意，要将input输入的值调整为数字型，不然你输入了一个number也会报错，因为会把它识别成字符串。
              { type: 'number', message: '必须为数字' },
            ]"
          >
            <!--  -->
            <el-input
              v-model.number="formUser.age"
              placeholder="输入年龄"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="性别"
            prop="sex"
            :rules="[{ required: true, message: '性别是必选项' }]"
          >
            <el-select v-model="formUser.sex" placeholder="选择性别">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="生日"
            prop="birth"
            :rules="[{ required: true, message: '出生日期是必选项' }]"
          >
            <el-date-picker
              label="出生日期"
              v-model="formUser.birth"
              type="date"
              placeholder="选择出生日期"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
          :rules="[{ required: true, message: '地址是必填项' }]"
        >
          <el-input v-model="formUser.addr" placeholder="输入地址" clearable />
        </el-form-item>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="handleCancel">取消</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{
          action === "add" ? "新增" : "修改"
        }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
} from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    // list为每一次对接口的接收到的用户表list，渲染到员工栏中
    const list = ref([]);
    // 控制模态框的显示隐藏
    const dialogVisible = ref(false);
    // 区分编辑和新增,一个dialog进行两次复用
    const action = ref("add");
    // config：生成表单页面的参数，page为搜索第几页的数据内容
    const config = reactive({
      total: 0,
      page: 1,
      name: "",
    });

    const tableLabel = reactive([
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "sexLabel",
        label: "性别",
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "地址",
        width: 320,
      },
    ]);
    // 搜索的词条绑定
    const formInline = reactive({
      keyword: "",
    });
    // 新增的用户表单 词条绑定。
    const formUser = reactive({
      name: "", // 新增的用户姓名
      age: "", // 新增的用户年龄
      sex: null,
      birth: "",
      addr: "",
    });
    // 点击页面栏，更新页面栏的同时更新页面
    const changePage = (page) => {
      config.page = page;
      getUserData(config);
    };
    // 通过config.name搜索数据
    const handleSearch = () => {
      config.name = formInline.keyword;
      console.log(formInline.keyWord);
      getUserData(config);
    };
    // 对前端获取的生日返回的结果做处理
    const timeFormat = (Time) => {
      var time = new Date(Time);
      var year = time.getFullYear();
      var month = time.getMonth();
      var date = time.getDate();
      function add(m) {
        return m < 10 ? "0" + m : m;
      }
      return year + "-" + add(month) + "-" + add(date);
    };
    // 点击新增按钮
    const handleAdd = () => {
      action.value = "add";
      dialogVisible.value = true;
    };
    // 点击编辑按钮
    const handleEdit = (row) => {
      console.log(row);
      // 浅拷贝，赋值到编辑表单中
      row.sex === 1 ? (row.sex = "男") : (row.sex = "女");
      action.value = "edit";
      dialogVisible.value = true;
      //  resetFields()方法在官网上的定义是：对整个表单进行重置，将所有字段值重置为初始值并移除校验效果。初始值也就是表单第一次绑定的值。浅拷贝给初始值赋值，给的内存地址，导致一个改变，另一个也会跟随变化。
      // 也就是说resetFields再第一次渲染出来的时候，就会记录初始值，所以要先更新dom，将表单的初始值设置为全空，我们在更新formUser，继续更新表单。
      proxy.$nextTick(() => {
        Object.assign(formUser, row);
      });
    };
    // 新增的表单填写后，却取消，就重置新增的表单
    const handleCancel = () => {
      dialogVisible.value = false;
      proxy.$refs.userForm.resetFields();
    };
    // 对新增用户的表单进行提交
    const onSubmit = () => {
      // 对新增用户的此时填写的案例进行校验，是否可行(是否满足要求)，再进行用户的添加。
      proxy.$refs.userForm.validate(async (valid) => {
        if (valid) {
          // 点击提交按钮，如果当前是添加，则调用添加接口，否则，就调用修改接口
          console.log(formUser);
          if (action.value === "add") {
            console.log(formUser);
            formUser.birth = timeFormat(formUser.birth);
            let res = await proxy.$api.addUser(formUser);
            console.log(res);
            if (res) {
              dialogVisible.value = false;
              proxy.$refs.userForm.resetFields();
              getUserData(config);
              console.log(res);
            }
          } else {
            formUser.birth = timeFormat(formUser.birth);
            let res = await proxy.$api.editUser(formUser);
            if (res) {
              dialogVisible.value = false;
              proxy.$refs.userForm.resetFields();
              getUserData(config);
            }
          }
        }
      });
    };
    // 删除用户
    const handleDelete = (row) => {
      ElMessageBox.confirm("确定删除?")
        .then(async () => {
          await proxy.$api.deleteUser({
            id: row.id,
          });
          // 直接没有引用ElMessage，结果getUserData放到ElMessage下面，会导致Vue不会更新，现在我有点明白为什么了，ElMessage因为没有引用结果这个回调函数不断地重试错误导致了阻塞，getUserData这个函数没有被调用。
          ElMessage({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
          getUserData(config);
        })
        .catch(() => {
          // catch error
        });
    };
    // 关闭dialog
    const handleClose = (done) => {
      ElMessageBox.confirm("是否关闭?")
        .then(() => {
          proxy.$refs.userForm.resetFields();
          done();
        })
        .catch(() => {
          // catch error
        });
    };

    onMounted(() => {
      getUserData(config);
    });
    // 获取当前页面的用户栏内容，对获取用户的接口进行发送，并渲染页面的用户。
    const getUserData = async (config) => {
      let res = await proxy.$api.getUserData(config);
      config.total = res.count;
      list.value = res.list.map((item) => {
        item.sexLabel = item.sex === 0 ? "女" : "男";
        return item;
      });
    };
    return {
      list,
      tableLabel,
      action,
      dialogVisible,
      config,
      changePage,
      formInline,
      handleSearch,
      handleAdd,
      handleEdit,
      handleClose,
      handleCancel,
      handleDelete,
      formUser,
      onSubmit,
    };
  },
});
</script>

<style lang="less" scoped>
.table {
  position: relative;
  height: 520px;
  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}

.user-header {
  display: flex;
  justify-content: space-between;
}

:deep(.el-select) {
  width: 100px;
}
// .user-headers .el-input {
//   --el-input-width: 220px;
// }

// .user-headers .el-select {
//   --el-select-width: 220px;
// }
</style>
