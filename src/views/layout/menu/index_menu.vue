<template>
  <div class="menu-list">
    <el-row class="tac">

  <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#EFEF7D"
      text-color="black"
      active-text-color="#ffd04b">
      <el-menu-item index="home" @click="toPage('home')">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 动态菜单导航组件 -->
      <MenuList :dyMenuList="dyMenuList"></MenuList>
    </el-menu>
  </el-col>
</el-row>

  </div>
</template>

<script>
import MenuList from './MenuList.vue'
import { mapState } from 'vuex'
export default {
  components: {
    MenuList
  },
  computed: {
    ...mapState('menu', ['dyMenuList'])
  },
  data () {
    return {
      active: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toPage (name) {
      console.log('这里试试 ---------------', name)
      this.$router.push(
        { name }
      )
    }
  },
  created () {
    // 首次处理一下-----------------------
    if (this.$route.meta.activeMenu) {
      this.active = this.$route.meta.activeMenu
    } else {
      this.active = this.$route.name
    }

    console.log('动态菜单导航目录', this.dyMenuList)
  },
  watch: {
    // 监听路由的变化---切换页面组件
    $route(to, from) {
      // console.log('watch---to',to);
      // 判断当前的路由里面 meta:{ activeMenu:'/product/list'}
      const { meta, name } = to
      if (meta.activeMenu) {
        this.active = meta.activeMenu
      } else {
        this.active = name
      }
    }
  }
}
</script>
<style lang="less" scoped>
.menu-list{
  width: 100%;
  height: 100%;
}

.el-col {
  width: 100%;
  color: black;
}
.el-menu {
  border-right: 0;

  /deep/ .is-active {
    background: #1e78bf !important;
    color: #fff !important;
  }

}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 100%;
}

</style>
