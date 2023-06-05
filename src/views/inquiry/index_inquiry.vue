<template>
  <div class="inquiry">
    <el-tabs type="border-card" v-model="editableTabsValue">
      <!-- 叫号标签栏 -->
      <el-tab-pane label="叫号管理">
        <div class="queue">
          <div class="queue_title">
            <div class="title_left">实时叫号队列</div>
            <div class="title_right">候补叫号队列</div>
          </div>
          <div class="queue_list">
            <div class="queue_list_left">
              <el-table
                :data="realTimeQueue"
                height="100%"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="registerDay"
                  label="就诊时间"
                  align="center"
                  min-width="20%">
                </el-table-column>
                <el-table-column
                  prop="registerName"
                  label="就诊者姓名"
                  align="center"
                  min-width="20%">
                </el-table-column>
                <el-table-column
                  prop="doctorName"
                  label="挂号医生"
                  align="center"
                  min-width="20%">
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="40%">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="toCandidate(scope.$index, scope.row)">转候补
                    </el-button>
                    <el-button
                      size="mini"
                      @click="doConsultation(scope.$index, scope.row)">问诊
                    </el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="open(scope.$index, scope.row)">取消叫号</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-divider class="middleDivider" direction="vertical"></el-divider>
            <div class="queue_list_right">
              <el-table
                :data="candidateQueue"
                height="100%"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="registerDay"
                  label="就诊时间"
                  align="center"
                  min-width="20%">
                </el-table-column>
                <el-table-column
                  prop="registerName"
                  label="就诊者姓名"
                  align="center"
                  min-width="20%">
                </el-table-column>
                <el-table-column
                  prop="doctorName"
                  label="挂号医生"
                  align="center"
                  min-width="20%">
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="40%">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="doConsultation(scope.$index, scope.row)">问诊
                    </el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="open(scope.$index, scope.row)">取消叫号</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 问诊标签栏 -->
      <el-tab-pane label="问诊管理" class="pane2">
        <div class="case">
          <div class="case_title">
            <div class="title_name">就诊者病例编辑</div>
            <div class="title_button">
              <el-button type="danger"  @click="viewPatientCase" >往期病例</el-button>
            </div>
          </div>
          <div class="case_list">
            <el-form  :model="ruleForm" :rules="rules" ref="caseForm" label-width="130px" class="case_form">
              <el-form-item label="就诊者姓名" prop="patientName">
                <el-col :span="8">
                <el-input v-model="ruleForm.patientName" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="就诊者性别" prop="patientSex">
                <el-col :span="4">
                <el-input v-model="ruleForm.patientSex" :disabled="true"></el-input>
              </el-col>
              </el-form-item>
              <el-form-item label="就诊者年龄" prop="patientAge">
                <el-col :span="4">
                <el-input v-model="ruleForm.patientAge" :disabled="true"></el-input>
              </el-col>
              </el-form-item>
              <el-form-item label="问诊医生" prop="doctorName">
                <el-col :span="8">
                <el-input v-model="ruleForm.doctorName" :disabled="true"></el-input>
              </el-col>
              </el-form-item>
              <el-form-item  label="简略病因" prop="simpleCase">
                <el-input v-model="ruleForm.simpleCause"></el-input>
              </el-form-item>
              <el-form-item type="textarea" label="详细病因" prop="detailCase">
                <el-input type="textarea" v-model="ruleForm.detailCause"></el-input>
              </el-form-item>
              <el-form-item label="上传图片" prop="causeImages">
                <UploadImg @sendImg="sendImg" ref="uploadImg" :fileList="fileList"></UploadImg>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="createList" class="medicine">生成药单</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm()">立即保存</el-button>
                <el-button @click="resetForm()">重置</el-button>
              </el-form-item>
            </el-form>

            <!-- 往期病例 -->
            <el-drawer
              title="往期病例"
              :visible.sync="drawer"
              :direction="direction"
              :before-close="handleClose">
              <el-table
                :data="caseTable"
                style="width: 100%">
                <el-table-column
                  prop="listTitle"
                  label="病例名"
                  min-width="80%">
                </el-table-column>
                <el-table-column
                  prop="detailCase"
                  label="详细病例名称"
                  v-if="false">
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="20%">
                  <template slot-scope="scope">
                    <el-button
                    type="primary"
                      size="mini"
                      @click="handleView(scope.$index, scope.row)">查看
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-drawer>
            <CaseDialog :info="info" ref="caseDialog" :type="type" ></CaseDialog>
            <!-- 药单生成 -->
            <el-drawer

              title="药单生成"
              size="50%"
              :visible.sync="medicineDrawer"
              direction="btt"
              :before-close="handleClose">
              <div class="medicineDrawer">
                <el-form :model="medicineForm" ref="dynamicValidateForm" label-width="200px" class="demo-dynamic">
                <el-form-item
                  v-for="(item, index) in medicineForm.medicines"
                  :label="'药单项' + (index + 1)"
                  :key="index"
                  :prop="'medicines.' + index + '.medicine'"
                  :rules="{
                    required: true, message: '药品名称与数量不能为空', trigger: 'blur'
                  }"
                >
                <el-col :span="8">
                  药品:<el-input  v-model="item.medicine"></el-input>
                  数量:
                  <el-input  v-model="item.count"></el-input>
                </el-col>
                  <el-button type="danger" @click.prevent="removeMedicine(item)">删除</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="addMedicine">新增</el-button>
                  <el-button type="warning" @click="toPrint">预览打印</el-button>
                </el-form-item>
              </el-form>
              </div>

            </el-drawer>
            <MedicineDialog :table="medicines" ref="medicineDialog" :type="type" ></MedicineDialog>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UploadImg from './UploadImages.vue'
import { mapMutations, mapState } from 'vuex'
import MedicineDialog from './MedicineDialog.vue'
import CaseDialog from './CaseDialog.vue'
export default {
  components: {
    UploadImg,
    MedicineDialog,
    CaseDialog
  },
  computed: {
    ...mapState('inquiry', ['rowData', 'title'])
  },
  data () {
    return {
      medicines: '',
      medicineForm: {
        medicines: [{
          medicine: '',
          count: ''
        }]
      },
      caseTable: [],
      drawer: false,
      medicineDrawer: false,
      direction: 'rtl',
      editableTabsValue: '0',
      info: '标题',
      type: 2, // 1 新增 2 修改
      fileList: [], // 图片容器集合
      realTimeQueue: '',
      candidateQueue: [],
      consultationPatient: [],
      tempRegisterId: '',
      ruleForm: {
        id: '',
        patientId: '',
        patientName: '',
        patientSex: '男',
        patientAge: '',
        doctorId: '',
        doctorName: '',
        simpleCause: '',
        detailCause: '',
        causeImages: []
      },
      tempRuleForm: {
        id: '',
        patientId: '',
        patientName: '',
        patientSex: '男',
        patientAge: '',
        doctorId: '',
        doctorName: '',
        simpleCause: '',
        detailCause: '',
        causeImages: []
      },
      patientInfo: {

      },
      rules: {

      }
    }
  },
  methods: {
    ...mapMutations('inquiry', ['changeRowData', 'changeTitle']),
    ...mapMutations('patientCase', ['changeCaseData', 'changeCaseTitle']),
    // 当前就诊者转候补
    async toCandidate(index, row) {
      console.log(index, row)
      const res = await this.$api.toCandidate(row)
      if (res.data.code === 200) {
        this.init()
      }
    },
    // 问诊当前就诊者
    async doConsultation (index, row) {
      const res = await this.$api.getPatientInfo({ patientId: row.registerId })
      this.consultationPatient = res.data.data
      this.ruleForm.doctorId = JSON.parse(JSON.stringify(row.doctorId))
      console.log('检查医生姓名', row.doctorName)
      this.ruleForm.doctorName = JSON.parse(JSON.stringify(row.doctorName))
      this.tempRegisterId = JSON.parse(JSON.stringify(row.id))
      this.startConsultation()
    },
    startConsultation() {
      this.ruleForm.patientId = this.consultationPatient.id
      this.ruleForm.patientName = this.consultationPatient.patientName
      this.ruleForm.patientSex = this.consultationPatient.patientSex
      this.ruleForm.patientAge = this.consultationPatient.patientAge
      this.editableTabsValue = '1'
    },
    // 弹窗
    // 删除
    open (index, row) {
      this.$confirm('此操作将永久删除该就诊者叫号项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        iconClass: '',
        center: true
      }).then(() => {
        console.log('删除按钮的意义是:', row)
        // 取消叫号
        this.$api.cancelRegister({ id: row.id })
        location.reload()
        // this.init()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    init() {
      this.getRealTimeQueue()
      this.getCandidateQueue()
    },
    async getRealTimeQueue() {
      const res = await this.$api.getRealTimeRegister()
      if (res.data.code === 200) {
        console.log('这里是查验集合', res.data.data)
        this.realTimeQueue = res.data.data
      } else {
        this.$message({
          type: 'info',
          message: '获取实时叫号列表失败'
        })
      }
    },
    async getCandidateQueue() {
      const res = await this.$api.getCandidateQueue()
      if (res.data.code === 200) {
        this.candidateQueue = res.data.data
      } else {
        this.$message({
          type: 'info',
          message: '获取候补叫号列表失败'
        })
      }
    },
    // 接受上传的图片路径----------------------
    sendImg(val) {
      console.log('val-----', val)
      this.ruleForm.causeImages.push(val)
    },
    createList() {
      this.medicineDrawer = true
    },
    // 提交表单
    async submitForm() {
      this.patientInfo = JSON.parse(JSON.stringify(this.ruleForm))
      this.patientInfo.causeImages = JSON.parse(JSON.stringify(JSON.stringify(this.ruleForm.causeImages)))
      console.log('这里是提交表单', this.patientInfo)
      const res = await this.$api.saveCase(this.patientInfo)
      console.log('这里是保存后的数据', res)
      if (res.data.code === 200) {
        // 将挂号项的状态置为完成
        this.$api.completeInquiry({ id: this.tempRegisterId })
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        setTimeout(() => {
          this.resetForm()
        }, 500)
      } else {
        this.$message({
          type: 'info',
          message: '保存失败!'
        })
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    viewPatientCase() {
      this.getPatientCase()
      this.drawer = true
    },
    handleView(index, row) {
      console.log('展示一下row', row.detailCase)
      this.changeCaseData(row.detailCase)
      this.$refs.caseDialog.dialogVisible = true
    },
    // 获取病人的往期病例
    async getPatientCase() {
      console.log('这里是获取往期病例', this.ruleForm.patientId)
      const res = await this.$api.getPatientCase({ patientId: this.ruleForm.patientId })
      console.log('这里是获取病例', res.data)
      this.caseTable = res.data.data
    },
    removeMedicine(item) {
      const index = this.medicineForm.medicines.indexOf(item)
      if (index !== -1) {
        this.medicineForm.medicines.splice(index, 1)
      }
    },
    addMedicine() {
      this.medicineForm.medicines.push({
        medicine: '',
        count: ''
      })
    },
    toPrint() {
      this.$refs.medicineDialog.dialogVisible = true
      this.medicines = JSON.parse(JSON.stringify(this.medicineForm.medicines))
      this.type = 2
    },
    handlePrint() {
    },
    resetForm() {
      this.ruleForm = JSON.parse(JSON.stringify(this.tempRuleForm))
      location.reload()
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
.inquiry{
  width: 100%;
  height: 100%;
}
.el-tabs--card {
  height: calc(89vh - 110px);
  /* overflow-y: auto; */
}
.el-tab-pane {
  height: calc(89vh - 110px);
  overflow-y: auto;
}
.middleDivider{
  height: 100%;
  color: black;
}

.queue{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  .queue_title{
    height: 7%;
    display: flex;
    justify-content: center;
    .title_left{
      height: 80%;
      width: 20%;
      font-size: 30px;
      font-family: '楷体';
      padding-right: 20%;
      padding-left: 15%;
    }
    .title_right{
      height: 80%;
      width: 20%;
      font-size: 30px;
      font-family: '楷体';
      padding-left: 25%;
      padding-right: 15%;
    }
  }
  .queue_list{
    display: flex;
    flex-direction: row;
    height: 90%;

    .case_list{
      width: 50%;
    }
    .queue_list_left{
      width: 58%;
      padding-right: 1%;
    }

    .queue_list_right{
      width: 40%;
      padding-left: 1%;
    }
  }

}

.case{
  width: 80%;
  height: 100%;
  padding-left: 20%;
  .case_title{
    font-size: 35px;
    align-items: center;
    padding-bottom: 2%;
    display: flex;
    justify-content: center;
    .title_name{
      padding-right: 40%;
    }
  }
  .case_list{
    width: 50%;
    font-size: 15px;
  }
  /deep/ .el-form-item__label{
  font-size: 20px;
}

.medicine{
  font-size: 35px;
}

}

.medicineDrawer{
  padding-left: 30%;
}
</style>
