<template>
    <el-header>
        <div class="l-content">
            <el-button size="small" @click="handleCollapse">
                <el-icon :size="20">
      <Menu />
            </el-icon>
            </el-button>
  <el-breadcrumb separator="/" class = "breed">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-if="current">
      <a :to="{path: current.path}">{{current.label}}</a>
    </el-breadcrumb-item>
    <!-- <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->
</el-breadcrumb>
        </div>
        <div class="r-content">
            <img class="user" :src="getImgSrc('user')" alt="">
            <el-dropdown>
    <span class="el-dropdown-link">
        <el-icon class="el-icon--right">
      </el-icon>
    </span>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
  </el-dropdown>
</div>
    </el-header>
</template>

<script>
import { defineComponent, computed} from 'vue';
import {useStore} from 'vuex';
// 导出一个vue对象。
    export default defineComponent({
        setup() {
            let store = useStore()
            // const imgSrc = require("../assets/images/user.png"); //webpack可以使用这么导入
            // 在vite实现静态引入，需要这么写
            // url构造函数，是esm的原生语法，他有两个参数农户，url和base，其中base是可选参数
            // 如果url是相对url，那么他会将base作为基准url，如果url是绝对url，那么base是否存在都会忽略
            // url是一个对象，其中的herf属性就是前面两个参数共同结合的结果
            const getImgSrc = (user) => new URL(`../assets/images/${user}.png`, import.meta.url).href;

            let handleCollapse = () => {
                // 调用vuex中的mutaitions
                store.commit('updateIsCollapse','123')
            }

            const current = computed(()=> {
                return store.state.currentMenu
            })
            return {
                getImgSrc,
                current,
                handleCollapse
            }
        }
    })
</script>

<style lang="less" scoped>
header {
    display:flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
    background: #333
}
.r-content {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    img {
        height: 100%;
        width: 100%;
    }
}
.l-content {
    display: flex;
    align-items: center;
    .el-button {
        margin-right: 20px;
    }
    h3 {
        color: #fff
    }
}


// 通常在引入第三方 UI 组件库（如 element-ui或者easyUI等等），需要自定义组件样式时，但由于样式使用了 scoped 属性（为避免组件之间的样式相互影响），导致无法直接覆盖原组件的样式，这时就需要用到样式穿透。
.breed /deep/ span{
    color: #fff;
    cursor: pointer;
}
</style>