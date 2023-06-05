<template>
  <div class="reception_contain">
    <div class="reception_form">
      <div class="formName">就诊者信息添加</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="receptionRuleForm">
        <el-form-item label="就诊者姓名" prop="patientName" label-width="16%">
          <el-input v-model="ruleForm.patientName"></el-input>
        </el-form-item>
        <el-form-item label="就诊者年龄" prop="patientAge" label-width="16%">
          <el-input v-model="ruleForm.patientAge"></el-input>
        </el-form-item>
        <el-form-item label="就诊者手机号" prop="patientPhone" label-width="16%">
          <el-input v-model="ruleForm.patientPhone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber" label-width="16%">
          <el-input v-model="ruleForm.idNumber"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="patientSex" label-width="16%">
          <el-select v-model="ruleForm.patientSex" placeholder="请选择就诊者性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="就诊者地址" prop="patientAddress" label-width="16%">
          <el-input type="textarea" v-model="ruleForm.patientAddress"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">就诊者信息保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    const checkIdNumber = async (rule, value, callback) => {
      if (value) {
        await this.$api.validIdNumber({ idNumber: value }).then((response) => {
          if (response.data.code === 200) {
            callback()
          } else {
            callback(new Error('身份证已经被注册'))
          }
        })
      }
    }
    return {
      ruleForm: {
        patientName: '',
        patientAge: '',
        patientPhone: '',
        idNumber: '',
        patientSex: '男',
        patientAddress: ''
      },
      resetStore: '',
      rules: {
        patientName: [
          { required: true, message: '请输入就诊者姓名', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ],
        patientAge: [
          { required: true, message: '请输入就诊者年龄', trigger: 'blur' }
        ],
        patientPhone: [
          { required: true, message: '请输入就诊者手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11', trigger: 'blur' }
        ],
        idNumber: [
          { required: true, message: '请输入就诊者手机号', trigger: 'blur' },
          { min: 15, max: 18, message: '长度为18', trigger: 'blur' },
          { validator: checkIdNumber, trigger: 'blur' }
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.receptionAddPatient()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.ruleForm = JSON.parse(JSON.stringify(this.resetStore))
    },
    async receptionAddPatient() {
      console.log('这里是诊所前台的添加就诊者信息')
      const res = await this.$api.receptionAddPatient(this.ruleForm)
      console.log('这里是诊所前台的添加就诊者信息的结果', res)
    },
    init() {
      this.resetStore = JSON.parse(JSON.stringify(this.ruleForm))
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="less" scoped>

.reception_contain{
  display: flex;
  width: 90%;
  height: 90%;
  padding-left: 10%;
  padding-top: 5%;
  background-color: white;
  .formName{
    width: 45%;
    font-size: 40px;
    padding-left: 30%;
    padding-bottom: 7%;
    font-family: '楷体';
  }
  .reception_form{
    width: 50%;
    height: 85%;
    padding-right: 10%;
    padding-left: 10%;
    padding-top: 2%;
    margin-left: 10%;
    background-color: rgb(247, 249, 245);
    border-width:3px;
    border-style:solid;
    border-radius: 5%;
    border-color:#333;
  }
}
</style>
