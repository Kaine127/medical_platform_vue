<template>
  <!--
      title  弹框标题
      visible是否显示 Dialog，支持 .sync 修饰符boolean—false

   -->
   <el-dialog :title="info.title" :visible="dialogVisible" width="30%" :before-close="handleClose" @close="dialogClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="30%" class="demo-ruleForm">
      <el-form-item label="出诊时间" prop="register">
        <el-select v-model="ruleForm.register" placeholder="请选择出诊时间">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value=Number(item.value)>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否出诊" prop="status">
        <el-switch v-model="ruleForm.status" active-value="1" inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label="线上挂号最大人数" prop="number">
        <el-select v-model="ruleForm.number" placeholder="请选择线上挂号最大人数">
          <el-option label="20" value="20"></el-option>
          <el-option label="30" value="30"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="全部挂号最大人数" prop="numberMax">
        <el-select v-model="ruleForm.numberMax" placeholder="请选择全部挂号最大人数">
          <el-option label="40" value="40"></el-option>
          <el-option label="50" value="50"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即保存</el-button>
        <el-button @click="resetForm()">重置</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['info', 'type', 'doctorInfo'],
  computed: {
    ...mapState('schedule', ['rowData', 'title'])
  },
  data () {
    return {
      dialogVisible: false,
      resetStore: '',
      tempDoctorId: '1',
      tempDoctorName: '1',
      ruleForm: {
        id: '',
        doctorId: '',
        name: '',
        register: '',
        status: 0,
        number: 20,
        numberMax: 40
      },
      rules: {
        register: [
          { required: true, message: '请选择出诊时间', trigger: 'change' }
        ],
        number: [
          { required: true, message: '请选择线上挂号最大人数', trigger: 'change' }
        ],
        numberMax: [
          { required: true, message: '请选择全部挂号最大人数', trigger: 'change' }
        ]
      },
      options: [],
      value: ''
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
          this.addSchedule(this.ruleForm)
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
      if (this.info.title === '编辑出诊时间') {
      // 赋值的rowData是一个新的值  深拷贝：JSON.parse(JSON.stringify())
      // this.ruleForm = { ...this.rowData };//image字符串 浅拷贝
        console.log('这里是区域判断区域内')
        this.ruleForm = JSON.parse(JSON.stringify(this.rowData))
        this.resetStore = JSON.parse(JSON.stringify(this.rowData))
        this.changeDoctorInfo()
      } else {
        this.ruleForm = {
          id: '',
          doctorId: '',
          name: '',
          register: '',
          status: 0,
          number: 20,
          numberMax: 40

        }
        this.resetStore = {
          id: '',
          doctorId: '',
          name: '',
          register: '',
          status: 0,
          number: 20,
          numberMax: 40
        }
        this.changeDoctorInfo()
      }

      if (this.dialogVisible === true) {
        console.log('这里是dialog方法内', this.ruleForm.doctorId)
        this.getOptions(this.ruleForm.doctorId, this.rowData.register)
      }
    },
    // 提交表单添加或修改出诊日期
    async addSchedule (params) {
      console.log('这里是添加出诊日期', JSON.stringify(params))
      const res = await this.$api.addSchedule(params)
      // const res = await axios({
      //   url: 'http://localhost:8080/schedule/add',
      //   method: 'post',
      //   data: JSON.stringify(params),
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json'
      //   }
      // })

      console.log('添加方法返回的是', res)
      this.dialogVisible = false
    },
    // 修改医生的id和姓名 用于处理添加逻辑中父组件传递过来的医生信息
    changeDoctorInfo () {
      this.ruleForm.doctorId = JSON.parse(JSON.stringify(this.tempDoctorId))
      this.ruleForm.name = JSON.parse(JSON.stringify(this.tempDoctorName))
    },
    // 获取options
    async getOptions (doctorId, regis) {
      console.log('进入到getoptions方法中了', regis)
      let res = ''
      if (regis === undefined) {
        res = await this.$api.getAddScheduleOption({ id: doctorId })
      } else {
        res = await this.$api.getScheduleOption({ id: doctorId, register: regis })
      }

      this.options = res.data.data
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
    },
    doctorInfo: {
      deep: true,
      handler () {
        this.tempDoctorId = this.doctorInfo[0]
        this.tempDoctorName = this.doctorInfo[1]
        this.changeDoctorInfo()
      }

    }
  }
}
</script>

<style>
 /* .el-form-item__label{
  width: 150px !important;
 } */
</style>
