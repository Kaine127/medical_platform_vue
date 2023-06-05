<template>
  <div class="index-content">
     <!-- 顶部 -->
     <div class="header">
      <!-- 右侧内容--时间 登录信息等 -->
      <div class="right">
        <el-tag type="success">{{ time }}</el-tag>
        <el-tag type="warning">欢迎&nbsp; {{ userinfo.user.name }}</el-tag>
        <el-button type="danger"><span class="el-icon-switch-button icon" @click="loginOut"></span></el-button>
      </div>
      <div class="middle_title">诊 所 挂 号 问 诊 平 台</div>
     </div>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapState('login', ['userinfo'])
  },
  methods: {
    ...mapMutations('menu', ['removeMenuList']),
    ...mapMutations('login', ['removeUser']),
    loginOut() {
      // 进入到登录界面
      this.$router.push('/login')
      // 清空菜单导航
      this.removeMenuList()
      // 清空登录
      this.removeUser()
      console.log('----退出登录----------------')
      localStorage.removeItem('info') // 删除有问题 需要单独删除模块名称  vuex持久化注意的 插件--
      localStorage.removeItem('login')
    }
  },
  data () {
    return {

    }
  },
  created () {
    this.time = dayjs().format('YYYY年MM月DD日 HH:mm:ss')
  }
}
</script>
<style lang="less" scoped>
.index-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;

}
.header{
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 8%;
  background-color: rgb(159, 216, 236);
  margin: 0;
  padding: 0;

  /deep/ .el-tag{
    display: inline-block;
    height: 60%;
    font-size: 20px;
    padding-top: 0.5%;
  }
  .middle_title{
    padding-top: 0.5%;
    height: 100%;
    font-size: 45px;
    width: 40%;
    font-family: '楷体';
  }
  .right{
    font-size: 20px;
    height: 100%;
    width: 30%;
    padding-top: 1%;
    span{
      padding-right: 3%;
      padding-left: 3%;
    }
  }
}
.wrapper {
  height: 95%;
  width: 98%;
  margin: 0;
  padding: 0;
  padding-left: 2%;
  background-color: rgb(234, 235, 234);
}
</style>
