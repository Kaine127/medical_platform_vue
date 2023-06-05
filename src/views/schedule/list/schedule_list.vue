<template>
  <div class="schedule_list">
     <div class="schedule_title">
          <!-- 选择医生 -->
        <el-button type="success" disabled class="doctor_name">请选择出诊医生:</el-button>
        <el-select v-model="value" placeholder="请选择" filterable @change="optionChange()">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="[item.value,item.label]">
        </el-option>
      </el-select>
      <el-button type="primary" id="schedule_add"  v-bind:disabled="isSubmitting" @click="addSchedule" ref="addSchedule" @mouseenter.native="addMouseOver()">添加出诊日期</el-button>
     </div>
  <!-- 出诊时间管理列表 -->
    <el-table
    :data="tableData"
    stripe
    height="98%"
    style="width: 100%"
    :header-cell-style="{fontSize:'20px'}"
    :cell-style="{fontSize:'20px'}"
    ref="scheduleTable"
    >
    <el-table-column
      prop="id"
      label="出诊时间id"
      align="center"
      v-if="false">
    </el-table-column>
    <el-table-column
      prop="doctorId"
      label="医生id"
      align="center"
      v-if="false">
    </el-table-column>
    <el-table-column
      prop="name"
      label="医生姓名"
      align="center"
      v-if="false">
    </el-table-column>
    <el-table-column
      prop="register"
      label="出诊时间"
      min-width="20%"
      align="center">
        <template #default="scope">
          <!-- 插值表达式支持函数执行 并且渲染的是函数的return值 -->
          {{ formatRegister(scope.row.register) }}
        </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="是否出诊"
      align="center"
      min-width="20%">
        <template #default="scope">
          <!-- 插值表达式支持函数执行 并且渲染的是函数的return值 -->
          {{ formatStatus(scope.row.status) }}
        </template>
    </el-table-column>
    <el-table-column
      prop="ensureOnly"
      label="唯一标识"
      align="center"
      v-if="false">
    </el-table-column>
    <el-table-column
      prop="number"
      label="线上挂号最大人数"
      align="center"
      min-width="20%">
    </el-table-column>
    <el-table-column
      prop="numberMax"
      label="全部挂号最大人数"
      align="center"
      min-width="20%">
    </el-table-column>
    <el-table-column label="操作" align="center" min-width="20%">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" @click="open">
          </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="open(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <!-- 弹框 -->
   <Dialog :info="info" ref="scheduleDialog" :type="type" :doctorInfo="value" @refreshList="refreshList"></Dialog>
  </div>
</template>

<script>
import Dialog from './Dialog.vue'
import { mapMutations } from 'vuex'
export default {
  components: {
    Dialog
  },
  data () {
    return {
      info: '标题',
      type: 1, // 1 新增 2 修改
      tableData: [],
      options: [],
      value: '',
      isSubmitting: false
    }
  },
  methods: {
    ...mapMutations('schedule', ['changeRowData', 'changeTitle']),
    onSubmit () {
      console.log('submit!')
    },
    // 获取医生列表
    async getDoctorList () {
      console.log('进入到方法内了')
      const res = await this.$api.doctorList()
      console.log('res--data', res.data.data)
      const doctorOption = []
      res.data.data.forEach(element => {
        const opt = {}
        opt.value = element.id
        opt.label = element.name
        doctorOption.push(opt)
      })
      this.options = doctorOption
    },
    // 出诊时间列表
    async getScheduleList (doctorId) {
      console.log('进入到方法: getScheduleList')
      const res = await this.$api.getScheduleList({ id: doctorId })
      console.log('res--data', res.data.data)
      this.tableData = res.data.data
      this.optionChange()
      // 判断是否还能添加
      if (this.tableData.length === 14) {
        this.isSubmitting = true
      } else {
        this.isSubmitting = false
      }
    },
    // 列表刷新
    refreshList () {
      console.log('进行列表刷新')
      this.optionChange()
    },
    // 根据医生下拉选项显示安排
    optionChange () {
      this.getScheduleList(this.value[0])
    },
    // 表格数字转换文字
    formatRegister (type) {
      const map = {
        1: '周一上午',
        2: '周一下午',
        3: '周二上午',
        4: '周二下午',
        5: '周三上午',
        6: '周三下午',
        7: '周四上午',
        8: '周四下午',
        9: '周五上午',
        10: '周五下午',
        11: '周六上午',
        12: '周六下午',
        13: '周日上午',
        14: '周日下午'
      }

      return map[type]
    },
    // 出诊状态转换
    formatStatus (type) {
      const map = {
        0: '否',
        1: '是'
      }

      return map[type]
    },
    handleEdit (index, row) {
      console.log(index, row)
      // 存储当前行的数据--vuex---跳转到另外一个界面--获取vuex行数据
      this.changeRowData(row)
      this.changeTitle('编辑')
      this.$refs.scheduleDialog.dialogVisible = true
      this.info = {
        title: '编辑出诊时间'
      }
      this.type = 2
    },
    handleDelete (index, row) {
      console.log(index, row)
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
        this.$api.deleteSchedule({ id: row.id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        console.log('这里是删除后进行信息查询')
        // this.getDoctorList(row.doctorId)
        this.optionChange()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      this.refreshList()
    },

    // 添加日程表
    addSchedule () {
      console.log('进入到添加日程表中了')
      this.$refs.scheduleDialog.dialogVisible = true
      this.info = {
        title: '新增出诊时间'
      }
      this.type = 1
    },
    // 判断是否能添加
    addMouseOver () {
      console.log('进入到按钮方法内部了')
      if (this.tableData.length === 14) {
        console.log('进入到14方法内部了')
        // document.getElementById('schedule_add').attr('disabled', true)
        this.isSubmitting = true
      }
    }
  },
  created () {
    this.getDoctorList()
  }
}
</script>
<style lang="less" scoped>
  .schedule_list{
    width: 100%;
    height: 97%;
    background-color: rgb(234, 235, 234);
  }
  // .el-table{
  //   margin-left: 0.5%;
  // }
  .el-select{
    margin-left: 0.5%;
  }

  .schedule_title{
    display: flex;
    margin-left: 2%;
    .doctor_name{
      font-size: 15px;
      padding: 0;
      margin: 0;
      color: black;
      padding-left: 0.5%;
      padding-right: 0.5%;
    }
  }

</style>
