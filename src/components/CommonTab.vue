<template>
  <div class="tags">
    <!-- 标签名称如果为home，不可删除 $route属性是当前切换的路由的属性-->
    <el-tag
      :key="tag.name"
      v-for="(tag, index) in tags"
      :closable="tag.name != 'home'"
      :disable-transitions="false"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const tags = store.state.tabsList;
    const route = useRoute();
    const router = useRouter();

    // 标签删除功能， 标签可以通过点击跳转路由， 当删除标签后， 标签消失， 并且根据一些特定情况跳转路由，如：删除当前所在路由的标签
    const handleClose = (item, index) => {
      store.commit("closeTab", item);
      // 此时，我使用了store的mutations的closeTab方法，tags被删除一个元素，长度-1

      // 当我们删除的标签，是当前的路由，则：跳转路由，跳转到前面那个
      if (item.name === route.name) {
        router.push(
          // index不会为0，为0的唯一的操作是删除首页，但我们的首页不能触发删除事件
          { name: tags[index - 1].name }
        );
      }
    };
    const changeMenu = (item) => {
      router.push({
        name: item.name,
      });
    };

    return {
      tags,
      changeMenu,
      handleClose,
    };
  },
});
</script>

<style lang="less" scoped>
.tags {
  margin: 20px;
  width: 100%;
}
</style>
