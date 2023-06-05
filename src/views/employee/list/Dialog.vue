<template>
  <!--
      title  弹框标题
      visible是否显示 Dialog，支持 .sync 修饰符boolean—false

   -->
   <el-dialog :title="info.title" :visible="dialogVisible" width="30%" :before-close="handleClose" @close="dialogClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="员工id" prop="id" v-if="false">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="员工姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" placeholder="请选择员工性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限" prop="authority">
        <el-select v-model="ruleForm.authority" placeholder="请选择员工权限">
          <el-option label="超级管理(医生)" :value=Number(1)></el-option>
          <el-option label="医生员工" :value=Number(2)></el-option>
          <el-option label="前台员工" :value=Number(3)></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否出诊" prop="status">
        <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['info', 'type'],
  computed: {
    ...mapState('employee', ['rowData', 'title'])
  },
  data () {
    return {
      dialogVisible: false,
      resetStore: '',
      ruleForm: {
        id: '',
        name: '',
        username: '',
        password: '',
        phone: '',
        sex: '男',
        authority: 2,
        status: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入医生名称', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        authority: [
          { required: true, message: '请选择权限', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleClose (done) {
      this.dialogVisible = false
    },
    async submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log('提交校验通过')
          const res = await this.$api.addOrUpdateEmployee(this.ruleForm)
          console.log(res)
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            setTimeout(() => {
              this.dialogClose()
              this.dialogVisible = false
            }, 500)
          } else {
            this.$message({
              type: 'info',
              message: '保存失败!'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.ruleForm = JSON.parse(JSON.stringify(this.resetStore))
    },
    refresh () {
      console.log('这里的refresh()数据是---------', this.rowData)
      if (this.info.title === '编辑诊所员工数据') {
      // 赋值的rowData是一个新的值  深拷贝：JSON.parse(JSON.stringify())
      // this.ruleForm = { ...this.rowData };//image字符串 浅拷贝
        console.log('这里是区域判断区域内')
        this.ruleForm = JSON.parse(JSON.stringify(this.rowData))
        this.resetStore = JSON.parse(JSON.stringify(this.rowData))
      } else {
        this.ruleForm = {
          id: '',
          name: '',
          username: '',
          phone: '',
          sex: '男',
          authority: 2,
          status: 1
        }
        this.resetStore = {
          id: '',
          name: '',
          username: '',
          phone: '',
          sex: '男',
          authority: 2,
          status: 1
        }
      }
    },
    // 关闭对话窗口
    dialogClose () {
      console.log('对话dialog关闭')
      this.$emit('refreshList')
    }

  },
  created () {

  },
  watch: {
    dialogVisible () {
      this.refresh()
    }
  }
}
</script>

<style>
 /* .el-form-item__label{
  width: 150px !important;
 } */
</style>
