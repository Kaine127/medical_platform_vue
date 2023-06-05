<template>
 <el-dialog :title="info.title" :visible="dialogVisible" width="50%" :before-close="handleClose" @close="dialogClose">
  <div class="case_content">
    <div class="content_top">
      <iframe :src="caseUrl" width="100%" height="700px" frameborder="0" scrolling="yes"></iframe>
    </div>
    <div class="content_bottom">
    </div>
  </div>
 </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['info', 'type'],
  components: {},
  computed: {
    ...mapState('patientCase', ['rowData', 'title'])
  },
  data () {
    return {
      dialogVisible: false,
      caseUrl: ''
    }
  },
  methods: {
    handleClose (done) {
      this.dialogVisible = false
    },
    // 关闭对话窗口
    dialogClose () {
      console.log('对话dialog关闭')
      this.handleClose()
    },
    init() {
      console.log('这里是病例路径', this.rowData)
      this.caseUrl = JSON.parse(JSON.stringify(this.rowData))
    }
  },
  created () {
  },
  watch: {
    dialogVisible () {
      console.log('这里是病例弹窗', this.dialogVisible)
      this.init()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
