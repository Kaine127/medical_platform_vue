<template>
  <div class="employee_list">
    <!-- 诊所员工管理头部 按钮与输入 -->
    <div class="employee_title">
      <!-- 头部搜索栏 -->
      <div class="employee_search">
        <el-input
          placeholder="请输入内容"
          v-model="employeeName"
          clearable>
        </el-input>
        <el-button type="info" @click="employeeSearch" plain size="medium">员工查询</el-button>
      </div>
      <!-- 头部添加员工 -->
      <div class="employee_add">
        <el-button type="primary" @click="addEmployee" plain size="medium">新增诊所员工</el-button>
      </div>
      <!-- 诊所员工管理表 功能按钮 -->
      <div class="employee_selectFunction">
        <!-- <el-button type="warning" @click="toggleAllSelection()" plain size="medium" >选择项反转</el-button>
        <el-button type="success" @click="toggleSelection()" plain size="medium">取消全部选择</el-button>
        <el-button type="info" @click="toggleSelection()" plain size="medium">批量状态变更</el-button> -->
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
    @selection-change="handleSelectionChange"
    >
    <!-- <el-table-column
      type="selection"
      width="55"
      :selectable="judgeSelect">
    </el-table-column> -->
    <el-table-column
      prop="id"
      label="员工id"
      align="center"
      v-if="false">
    </el-table-column>
    <el-table-column
      prop="name"
      label="员工姓名"
      min-width="10%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="username"
      label="登录账号"
      min-width="10%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      min-width="10%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      min-width="10%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="authority"
      label="权限"
      align="center"
      min-width="10%">
        <template #default="scope">
          <!-- 插值表达式支持函数执行 并且渲染的是函数的return值 -->
          {{ formatAuthority(scope.row.authority) }}
        </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      align="center"
      min-width="7%">
        <template #default="scope">
          <!-- 插值表达式支持函数执行 并且渲染的是函数的return值 -->
          {{ formatStatus(scope.row.status) }}
        </template>
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      align="center"
      min-width="20%">
    </el-table-column>
    <el-table-column
      prop="createUser"
      label="创建人员"
      align="center"
      v-if="false">
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
          @click="open(scope.$index, scope.row)" :disabled="scope.row.id == 1">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <Pagination :total="totalPage" :pageSize="pageSize" @CurrentChange="CurrentChange"></Pagination>
  <Dialog :info="info" ref="employeeDialog" :type="type"  @refreshList="refreshList"></Dialog>
  </div>
</template>

<script>
import Dialog from './Dialog.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import { mapMutations } from 'vuex'
export default {
  components: {
    Dialog,
    Pagination
  },
  data () {
    return {
      info: '标题',
      type: 1, // 1 新增 2 修改
      tableData: [],
      employeeName: '',
      pageSize: 10,
      totalPage: 100,
      currentPage: 1
    }
  },
  methods: {
    ...mapMutations('employee', ['changeRowData', 'changeTitle']),
    // 根据数字展示对应文字
    formatAuthority (type) {
      const map = {
        1: '超级管理(医生)',
        2: '医生员工',
        3: '前台员工'
      }
      return map[type]
    },
    formatStatus (type) {
      const map = {
        0: '禁用',
        1: '正常'

      }
      return map[type]
    },
    // 获取员工列表信息
    async getEmployeeList () {
      console.log('进入到方法: getEmployeeList')
      const res = await this.$api.getEmployeeList({ page: this.currentPage, pageSize: this.pageSize, name: this.employeeName })
      console.log('res--data--data', res.data.data)
      console.log('res--data', res.data)
      this.tableData = res.data.data.records
      this.totalPage = res.data.data.total
    },
    // 单选
    handleSelectionChange (val) {
      console.log('这里被选则了', val)
      this.multipleSelection = val
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
        this.$api.deleteEmployee({ id: row.id })
        setTimeout(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }, 500)

        location.reload()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 诊所员工搜索
    employeeSearch () {
      console.log('这里是诊所员工搜索')
    },
    // 列表刷新
    refreshList () {
      this.getEmployeeList()
    },
    // 编辑系统查询
    handleEdit (index, row) {
      console.log(index, row)
      // 存储当前行的数据--vuex---跳转到另外一个界面--获取vuex行数据
      this.changeRowData(row)
      this.changeTitle('编辑')
      this.$refs.employeeDialog.dialogVisible = true
      this.info = {
        title: '编辑诊所员工数据'
      }
      this.type = 2
    },
    // 添加员工信息
    addEmployee () {
      console.log('进入到添加员工中了')
      this.$refs.employeeDialog.dialogVisible = true
      this.info = {
        title: '新增诊所员工'
      }
      this.type = 1
    },
    // 获取分页页码------------------------------
    CurrentChange (page) {
      console.log('这里是currentChange方法')
      this.currentPage = page
    },
    // 不可被选
    judgeSelect (row, index) {
      console.log('这里是不可被选', row.data)
      if (index === 0) {
        return false
      }
      return true
    },
    // 判断是否可以删除
    cantDelete (row) {
      console.log('这里是cantDelete', row)
    }
  },
  created () {
    this.getEmployeeList()
  }
}
</script>
<style lang="less" scoped>
  //员工列表
  .employee_list{
    width: 100%;
    height: 100%;
    // background-color: yellow;

    .el-table{
      width: 100%;
      height: 95%;
    }
    .employee_title{
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 5%;
      // background-color: blue;

      .employee_search{
        display: flex;
        margin-left: 2%;
        /deep/ input {
          height: 100%;
        }
      }

      .employee_add{
        display: flex;
      }

      .employee_selectFunction{
        display: flex;
        margin-right: 10%;
      }
    }
  }
</style>
