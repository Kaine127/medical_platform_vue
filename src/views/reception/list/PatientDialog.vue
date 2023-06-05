<template>
  <!--
      title  弹框标题
      visible是否显示 Dialog，支持 .sync 修饰符boolean—false

   -->
   <el-dialog :title="info.title" :visible="dialogVisible" width="30%" :before-close="handleClose" @close="dialogClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="receptionRuleForm">
        <el-form-item label="就诊者姓名" prop="patientName" label-width="20%">
          <el-input v-model="ruleForm.patientName" ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="patientAge" label-width="20%">
          <el-input v-model="ruleForm.patientAge"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="patientPhone" label-width="20%">
          <el-input v-model="ruleForm.patientPhone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber" label-width="20%">
          <el-input v-model="ruleForm.idNumber"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="patientSex" label-width="20%">
          <el-select v-model="ruleForm.patientSex" placeholder="请选择就诊者性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="就诊者地址" prop="patientAddress" label-width="20%">
          <el-input type="textarea" v-model="ruleForm.patientAddress"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">就诊者信息保存</el-button>
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
    ...mapState('patient', ['rowData', 'title'])
  },
  data () {
    return {
      dialogVisible: false,
      resetStore: '',
      ruleForm: {
        patientName: '',
        patientAge: '',
        patientPhone: '',
        idNumber: '',
        patientSex: '男',
        patientAddress: ''
      },
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
        idNumber: [
          { required: true, message: '请输入就诊者手机号', trigger: 'blur' },
          { min: 18, max: 18, message: '长度为18', trigger: 'blur' }
        ],
        patientSex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        patientAddress: [
          { required: true, message: '请填写就诊者地址', trigger: 'blur' }
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
          this.saveEdit(this.ruleForm)
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
      // 赋值的rowData是一个新的值  深拷贝：JSON.parse(JSON.stringify())
      // this.ruleForm = { ...this.rowData };//image字符串 浅拷贝
      console.log('这里是区域判断区域内')
      this.ruleForm = JSON.parse(JSON.stringify(this.rowData))
      this.resetStore = JSON.parse(JSON.stringify(this.rowData))
    },
    // 关闭对话窗口
    dialogClose () {
      console.log('对话dialog关闭')
      this.$emit('refreshList')
      this.handleClose()
    },
    async saveEdit(params) {
      const res = await this.$api.updatePatient(params)
      console.log('这里是修改就诊者信息的结果', res)
      if (res.data.code === 200) {
        this.$message('保存成功')
        this.dialogClose()
      } else {
        this.$message('保存失败,请重试')
      }
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
