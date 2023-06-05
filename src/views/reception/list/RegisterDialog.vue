<template>
  <!--
      title  弹框标题
      visible是否显示 Dialog，支持 .sync 修饰符boolean—false

   -->
   <el-dialog :title="info.title" :visible="dialogVisible" width="30%" :before-close="handleClose" @close="dialogClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="receptionRuleForm">
        <el-form-item  label="就诊者姓名" prop="patientName" label-width="20%">
          <el-input v-model="ruleForm.patientName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="patientAge" label-width="20%">
          <el-input v-model="ruleForm.patientAge" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="patientPhone" label-width="20%">
          <el-input v-model="ruleForm.patientPhone" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="patientSex" label-width="20%">
          <el-input v-model="ruleForm.patientSex" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="挂号医生" prop="doctorName">
          <el-select v-model="doctorName" placeholder="请选择挂号医生">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">实时挂号</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>

</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['info', 'type'],
  computed: {
    ...mapState('patient', ['rowData', 'title'])
  },
  data () {
    return {
      dialogVisible: false,
      ruleForm: {
        patientName: '1',
        patientAge: '',
        patientPhone: '',
        idNumber: '',
        patientSex: '男',
        patientAddress: ''
      },
      options: [],
      doctorName: '',
      rules: {
        patientName: [
          { required: true, message: '请输入就诊者姓名', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ],
        patientAge: [
          { required: true, message: '请输入就诊者年龄', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值' }
        ],
        patientPhone: [
          { required: true, message: '请输入就诊者手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11', trigger: 'blur' }
        ],
        patientSex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleClose (done) {
      this.dialogVisible = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('提交校验通过')
          this.receptionRegister(this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    refresh () {
      console.log('这里的refresh()数据是---------', this.rowData)
      // 赋值的rowData是一个新的值  深拷贝：JSON.parse(JSON.stringify())
      // this.ruleForm = { ...this.rowData };//image字符串 浅拷贝
      console.log('这里是区域判断区域内')
      this.ruleForm = JSON.parse(JSON.stringify(this.rowData))
    },
    // 关闭对话窗口
    dialogClose () {
      console.log('对话dialog关闭')
      this.$emit('refreshList')
      this.handleClose()
    },
    async receptionRegister(params) {
      const sendParams = JSON.parse(JSON.stringify(params))
      sendParams.doctorName = this.doctorName
      console.log('这里是实时挂号前', sendParams)
      const res = await this.$api.receptionRegister(sendParams)
      console.log('这里是实时挂号的结果', res)
      if (res.data.code === 200) {
        this.$message('保存成功')
        this.dialogClose()
      } else {
        this.$message('保存失败,请重试')
      }
    },
    async getDoctorName() {
      const res = await this.$api.getDoctorName()
      console.log('这里是实时挂号获取医生列表的结果', res)
      this.options = res.data.data
    }

  },
  created () {

  },
  watch: {
    dialogVisible () {
      this.refresh()
      this.getDoctorName()
    }
  }
}
</script>

<style>
 /* .el-form-item__label{
  width: 150px !important;
 } */
</style>
