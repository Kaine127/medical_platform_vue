<template>
  <div class="sign">
    <div class="sign_content">
      <div class="sign_title">
        就 诊 者 线 上 预 约 签 到
      </div>
      <div class="sign_input">
        <el-form :model="signForm" ref="numberValidateForm" label-width="150px" class="demo-ruleForm" style="width: 100%">
          <el-form-item
            label="签到码"
            prop="sign"
            min-width="30%"
            :rules="[
              { required: true, message: '签到码不能为空'},
              { type: 'number', message: '签到码必须为五位数字值'}
            ]"
          >
            <el-input class="signInput" v-model.number="signForm.sign" autocomplete="off" style="width: 70%"></el-input>
          </el-form-item>
          <el-form-item class="button_content">
            <el-button class="button" type="warning" @click="doSign"> 签&emsp; 到 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      signForm: {
        sign: ''
      }
    }
  },
  methods: {
    async doSign() {
      console.log('这里是签到方法')
      const res = await this.$api.doSign({ sign: this.signForm.sign })
      if (res.data.code === 200) {
        this.$message({
          type: 'success',
          message: '签到成功!'
        })
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } else {
        this.$message({
          type: 'info',
          message: '签到失败,.请重试!'
        })
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }
    }
  },
  created () {}
}
</script>
<style lang="less" scoped>
.sign{
  width: 100%;
  height: 100%;
}
.sign_content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 50%;
  padding-left: 25%;
  padding-top: 7%;
  font-size: 50px;
}
.sign_title{
  padding-right: 25%;
}

.sign_input{
  padding-top: 10%;
  width: 100%;
}

/deep/ .signInput{
  min-width: 70%;
  font-size: 50px;
}

/deep/ .el-form-item__label{
  font-size: 35px;
}
.button_content{
  padding-left: 20%;
  .button{
    font-size: 35px;
  }
}
</style>
