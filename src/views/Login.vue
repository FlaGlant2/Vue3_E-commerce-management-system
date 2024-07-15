<template>
  <el-form :model="loginForm" class="login-container">
    <h3>系统登陆</h3>
    <el-form-item>
      <el-input
        type="input"
        placeholder="输入账号"
        v-model="loginForm.username"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        type="input"
        placeholder="输入密码"
        v-model="loginForm.password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const loginForm = reactive({
      username: "admin",
      password: "admin",
    });

    const login = async () => {
      let res = await proxy.$api.getMenu(loginForm);
      if (res.message == "获取成功") {
        store.commit("setMenu", res.menu);
        store.commit("getMenu", router);
        router.push({
          name: "home",
        });
      }
    };
    return {
      loginForm,
      login,
    };
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  margin: 180px auto;
  h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #505350;
  }

  :deep(.el-form-item_content) {
    justify-content: center;
  }
}
</style>
