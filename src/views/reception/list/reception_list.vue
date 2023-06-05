<template>
  <div class="patient_ist">
    <div class="patient_title">
      <!-- 头部搜索栏 -->
      <div class="patient_search">
        <el-input
          placeholder="请输入内容"
          v-model="patientName"
          clearable>
        </el-input>
        <el-button type="info" @click="patientSearch" plain size="medium">就诊者查询</el-button>
      </div>
    </div>
    <!-- 诊所员工管理列表 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :header-cell-style="{fontSize:'20px'}"
      :cell-style="{fontSize:'20px'}"
      ref="scheduleTable"
      >
      <el-table-column
        prop="id"
        label="就诊者id"
        align="center"
        v-if="false">
      </el-table-column>
      <el-table-column
        prop="patientName"
        label="就诊者姓名"
        min-width="10%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="patientAge"
        label="年龄"
        min-width="5%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="patientSex"
        label="性别"
        min-width="5%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="patientPhone"
        label="手机号"
        min-width="10%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="patientAddress"
        label="地址"
        align="center"
        min-width="30%">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        min-width="20%">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="20%">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleRegister(scope.$index, scope.row)">挂号
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="open(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination :total="totalPage" :pageSize="pageSize" @CurrentChange="CurrentChange"></Pagination>
    <Dialog :info="info" ref="patientDialog" :type="type"  @refreshList="refreshList"></Dialog>
    <RegisterDialog :info="info" ref="registerDialog" :type="type"  @refreshList="refreshList"></RegisterDialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/Pagination.vue'
import Dialog from './PatientDialog.vue'
import RegisterDialog from './RegisterDialog.vue'
import { mapMutations } from 'vuex'
export default {
  components: {
    Pagination,
    Dialog,
    RegisterDialog
  },
  data () {
    return {
      info: '标题',
      type: 2, // 1 新增 2 修改
      tableData: '',
      pageSize: 10,
      totalPage: 100,
      currentPage: 1,
      patientName: ''
    }
  },
  methods: {
    ...mapMutations('patient', ['changeRowData', 'changeTitle']),
    patientSearch() {

    },
    // 弹窗
    // 删除
    open (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        iconClass: '',
        center: true
      }).then(() => {
        console.log('删除按钮的意义是:', row)
        // 删除当前项
        this.$api.receptionDelete({ id: row.id })
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
    // 列表刷新
    refreshList () {
      this.getReceptionPatientList()
    },
    // 编辑系统查询
    handleEdit (index, row) {
      console.log(index, row)
      // 存储当前行的数据--vuex---跳转到另外一个界面--获取vuex行数据
      this.changeRowData(row)
      this.changeTitle('编辑')
      this.$refs.patientDialog.dialogVisible = true
      this.info = {
        title: '编辑就诊者数据'
      }
      this.type = 2
    },
    // 当前就诊者挂号
    handleRegister(index, row) {
      console.log(index, row)
      // 存储当前行的数据--vuex---跳转到另外一个界面--获取vuex行数据
      this.changeRowData(row)
      this.changeTitle('挂号')
      this.$refs.registerDialog.dialogVisible = true
      this.info = {
        title: '就诊者挂号'
      }
      this.type = 2
    },
    // 获取分页页码------------------------------
    CurrentChange (page) {
      console.log('这里是currentChange方法')
      this.currentPage = page
      this.getReceptionPatientList()
    },
    // 获取员工列表信息
    async getReceptionPatientList () {
      console.log('进入到方法: getReceptionPatientList')
      const res = await this.$api.getReceptionPatientList({ page: this.currentPage, pageSize: this.pageSize, name: this.patientName })
      console.log('res--data--data', res.data.data)
      console.log('res--data', res.data)
      this.tableData = res.data.data.records
      this.totalPage = res.data.data.total
    }
  },
  created () {
    this.getReceptionPatientList()
  }
}
</script>
<style lang="less" scoped>
.patient_title{
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 5%;
      // background-color: blue;

      .patient_search{
        display: flex;
        margin-left: 2%;
        /deep/ input {
          height: 100%;
        }
      }
}

.employee_list{
    width: 100%;
    height: 100%;
    // background-color: yellow;

    .el-table{
      width: 100%;
      height: 95%;
    }
}
</style>
