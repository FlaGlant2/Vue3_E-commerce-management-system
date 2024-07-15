<template>
  <el-aside :width="$store.state.isCollapse ? '180px' : '60px'">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      color="#fff"
      :collapse="!$store.state.isCollapse"
      :collapse-transition="false"
    >
      <h3 v-show="$store.state.isCollapse">后台管理</h3>
      <h3 v-show="!$store.state.isCollapse">后台</h3>
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <!-- <el-icon><icon-menu /></el-icon> -->
        <!-- 上免得front-icon已经被ep团队遗弃了，使用动态图标 -->
        <!-- <component> 标签被用来作为一个占位符，它不会渲染为任何具体的 HTML 元素。
:is="item.icon" 是一个动态绑定，它告诉 Vue 在这个位置上应该渲染哪个组件。这里，它基于 item.icon 的值来决定。 -->
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="item.label"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <!-- 插槽 -->
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <!-- // tittle就是一个给这个group取一个名字，并且渲染到页面上 -->
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const router = useRouter();
    // const list = [
    //   {
    //     path: "/user",
    //     name: "user",
    //     label: "用户管理",
    //     icon: "user",
    //     url: "UserManage/UserManage",
    //   },
    //   {
    //     label: "other",
    //     icon: "location",
    //     children: [
    //       {
    //         path: "/page1",
    //         name: "page1",
    //         label: "页面1",
    //         icon: "setting",
    //         url: "Other/PageOne",
    //       },
    //       {
    //         path: "/page2",
    //         name: "page2",
    //         label: "页面2",
    //         icon: "setting",
    //         url: "Other/PageTwo",
    //       },
    //     ],
    //   },
    // ];
    let store = useStore();
    const asyncList = store.state.menu;
    const noChildren = () => asyncList.filter((item) => !item.children);
    const hasChildren = () => asyncList.filter((item) => item.children);
    //

    const clickMenu = (item) => {
      // 通过router.push，放入router配件下的参数，如果router.push里的参数与router.js下定义的参数匹配，则会修改路径呈现路由。
      // 你可能需要传query参数或者param参数，如果要传query参数必须用path属性匹配router.js的路由，如果要穿param就用name定位路由。
      router.push({
        name: item.name,
      });
      store.commit("selectMenu", item);
    };

    return {
      noChildren,
      hasChildren,
      clickMenu,
    };
  },
});
</script>

<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
}
.el-menu {
  border-right: none;
  color: #fff;
  h3 {
    line-height: 48px;
    text-align: center;
  }
}

.el-menu-item {
  color: #fff;
}

.el-sub-menu {
  height: 50px;
  line-height: 50px;
}
</style>
