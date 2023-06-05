<template>
  <div class="menu-list">
    <el-row class="tac">

  <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#99ff66"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>首页</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-submenu index="/inquiry">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>叫号问诊</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
      <el-menu-item index="/inquiry" @click="toPage('/inquiry')">
        <i class="el-icon-setting"></i>
        <span slot="title">叫号问诊</span>
      </el-menu-item>
      <!-- <el-submenu index="/schedule">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>问诊时间管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/schedule/schedule_list" @click="toPage('/schedule')">出诊列表</el-menu-item>
          <el-menu-item index="/schedule">出诊安排</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
      <el-menu-item index="/schedule/schedule_list" @click="toPage('/schedule')">
        <i class="el-icon-setting"></i>
        <span slot="title">问诊时间管理</span>
      </el-menu-item>
      <el-submenu index="/reception">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>前台管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/reception/patient_list" @click="toPage('/reception/patient_list')">就诊者列表</el-menu-item>
          <el-menu-item index="/reception/patient_add" @click="toPage('/reception/patient_add')">就诊者注册</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/sign" @click="toPage('/sign')">
        <i class="el-icon-setting"></i>
        <span slot="title">线上预约签到</span>
      </el-menu-item>
      <!-- <el-submenu index="/employee">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>人员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/employee/employee_list" @click="toPage('/employee/employee_manage')">人员管理</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
      <el-menu-item index="/employee/employee_manage" @click="toPage('/employee/employee_manage')">
        <i class="el-icon-setting"></i>
        <span slot="title">诊所员工管理</span>
      </el-menu-item>

    </el-menu>
  </el-col>
</el-row>

  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {

    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toPage (path) {
      console.log('这里试试 ---------------', path)
      this.$router.push(
        { path }
      )
    }
  },
  created () {}
}
</script>
<style lang="less" scoped>
.menu-list{
  width: 100%;
  height: 100%;
}

.el-col {
  width: 100%;
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
