<template>
  <!--
      title  弹框标题
      visible是否显示 Dialog，支持 .sync 修饰符boolean—false

   -->
   <el-dialog title="药单表" :visible="dialogVisible" width="50%" :before-close="handleClose" @close="dialogClose">
    <div id="printFrom">
      <el-table
      :data="medicineTable"
      style="width: 100%">
      <el-table-column
        prop="medicine"
        label="药品"
        width="220">
      </el-table-column>
      <el-table-column
        prop="count"
        label="数量"
        width="180">
      </el-table-column>
    </el-table>
  </div>
  <div class="printButton">
    <el-button  type="success" round @click="handlePrint(printData)">打印</el-button>
  </div>
  </el-dialog>

</template>

<script>
import PrintJS from 'print-js'
import { mapState } from 'vuex'
export default {
  props: ['table', 'type'],
  computed: {
    ...mapState('patient', ['rowData', 'title'])
  },
  data () {
    return {
      dialogVisible: false,
      printData: {
        printable: 'printFrom',
        header: '',
        ignore: ['no-print']
      },
      medicineTable: []

    }
  },
  methods: {
    handleClose (done) {
      this.dialogVisible = false
    },
    refresh () {
      this.medicineTable = JSON.parse(JSON.stringify(this.table))
    },
    // 关闭对话窗口
    dialogClose () {
      console.log('对话dialog关闭')
      this.handleClose()
    },
    removeMedicine(item) {
      const index = this.medicineForm.medicines.indexOf(item)
      if (index !== -1) {
        this.medicineForm.medicines.splice(index, 1)
      }
    },
    addMedicine() {
      this.medicineForm.medicines.push({
        medicine: ''
      })
    },
    handlePrint(params) {
      PrintJS({
        printable: params.printable, // 'printFrom', // 标签元素id
        type: params.type || 'html',
        header: params.header, // '表单',
        targetStyles: ['*'],
        style: '@page {margin:0 10mm};', // 可选-打印时去掉眉页眉尾
        ignoreElements: params.ignore || [], // ['no-print']
        properties: params.properties || null
      })
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
#printFrom{
  padding-left: 30%;
}

.printButton{
  padding-top: 5%;
  padding-left: 45%;
}
</style>
