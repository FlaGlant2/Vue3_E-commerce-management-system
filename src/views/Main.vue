<template>
    <div class="common-layout">
      <el-container class="lay-container">
        <common-aside />
        <el-container>
          <common-header />
          <common-tab />
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>

<script>
// defineComponent 是 Vue 3 中引入的一个函数，用于定义 Vue 组件
import {defineComponent} from 'vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonAside from '../components/CommonAside.vue'
import CommonTab from '../components/CommonTab.vue'
// 在vue中，大小写不敏感，你局部的声明引用了一个自定义组件CommonHeader
// 所以在标签里使用这个组件的过程中，需要用kebab-case的方式来使用
export default defineComponent({
  components: {
    CommonHeader,
    CommonAside,
    CommonTab
  }
});
</script>

<style lang="less" scoped>
.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
}
.common-layout {
  .lay-container {
    display: flex;
    flex-wrap: nowrap;
  }
  height: 100%;
  & > .el-container {
    height: 100%;
    & > .el-aside {
      height: 100%;
      background: #545c64;
    }
  }
}

</style>