<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <div class="menu">
      <div class="menu_title">
        <div class="title_image">
          <img class="inner_image" src="@/assets/images/shouye_img.png">
        </div>
      </div>
        <Menu></Menu>
    </div>
    <!-- 右侧内容 -->
    <div class="content">
        <Content></Content>
    </div>
  </div>
</template>

<script>
import Menu from '@/views/layout/menu/index_menu.vue'
import Content from '@/views/layout/content/index_content.vue'
export default {
  components: {
    Menu,
    Content
  },
  data () {
    return {

    }
  },
  methods: {},
  created () {}
}
</script>
<style lang="less" scoped>
.layout{
    display: flex;
    height: 96.5%;
    width: 98%;
    .menu{
        // width: 200px;
        width: 13%;
        height: 100%;
        background: rgb(118, 167, 157);
        // position: fixed;
        left:0;
        top:0;
        bottom:0;
        .menu_title{
          width: 100%;
          height: 8%;
          background-color: rgb(123, 218, 158);
          .title_image {
            height: 100%;
            width: 100%;
             /* 加载背景图 */
            // background-image: url('@/assets/images/shouye.jpg');
            /* 背景图垂直、水平均居中 */
            background-position: center center;
            /* 背景图不平铺 */
            background-repeat: no-repeat;
            /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
            background-attachment: fixed;
            /* 让背景图基于容器大小伸缩 */
            background-size: cover;
            /* 设置背景颜色，背景图加载过程中会显示背景色 */
            background-color: #464646;
            .inner_image{
              height: 100%;
              width: 40%;
              padding-left: 30%;
            }
          }
        }
    }
    .content{
      width: 87%;
      background-color: white;
        // padding-left:200px;
    }

}
</style>
