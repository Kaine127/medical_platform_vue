<template>
  <div>

      <el-upload
          action="http://localhost:8080/employee/uploadCause"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          ref="upload"
          multiple>
          <i class="el-icon-plus"></i>
      </el-upload>
  </div>
</template>

<script>
// import { uploadUrl } from '@/api/base'
export default {
  props: {
    fileList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      // fileList:[],
      // 上传的文件列表 [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
    }
  },
  methods: {
    // 上传成功-----------------------------
    handleSuccess(response, file, fileList) {
      console.log('成功', response)
      console.log('成功', file)
      console.log('成功', fileList)
      // 获取上传成功后的图片的地址 <img src=''/> http://localhost:7788/+相对路径
      const imgUrl = response.data.url
      this.$emit('sendImg', imgUrl)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 清空图片列表展示---------------
    clear() {
      // console.log('清空图片列表展示-------');
      // this.fileList=[]
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style>

</style>
