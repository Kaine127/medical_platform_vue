<template>
  <div class="home">
    <div class="top">
      <div class="top_left">
        <div class="images">
          <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="item in images" :key="item">
            <img :src="item" class="imagesUrl">
          </el-carousel-item>
        </el-carousel>
        </div>
      </div>
      <div class="top_right">
        <div class="pie_title">今日剩余挂号项</div>
        <div id="pie" style="width: 100%; height: 400px"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_left"></div>
      <div class="bottom_right"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  components: {},
  data () {
    return {
      images: ['http://127.0.0.1:9000/medical/2023/04/29/44a25d2568174ef3999598ed35d9a2c5.png', 'http://127.0.0.1:9000/medical/2023/04/23/d8766e88e4e24c29afbeb063528d3e53.jpg', 'http://127.0.0.1:9000/medical/2023/05/04/54cdc6c501394c5484fb2c325a951476.png'],
      pieForm: ''
    }
  },
  methods: {
    // 绘制饼图
    pie(pieData) {
      const myChart = echarts.init(document.getElementById('pie'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{d}%'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '今日挂号数',
            type: 'pie',
            radius: '50%',
            data: pieData,
            // data: [//[{},{}]
            //   { value: 1048, name: '审议' },
            //   { value: 735, name: '淘宝' },
            //   { value: 580, name: '京东' }
            // ],
            emphasis: { // 高亮配置
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      option && myChart.setOption(option)
    },
    async getPieData() {
      const res = await this.$api.getRegisterCount()
      console.log('这里是获取饼状图', res.data)
      this.pieForm = res.data.data
      this.pie(this.pieForm)
    },
    init() {
      this.getPieData()
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
.home {
  background-color: white;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .top{
    padding-top: 5%;
    width: 100%;
    height: 65%;
    display: flex;
    flex-direction: row;
    .top_left{
      width: 55%;
      height: 100%;
      padding-right: 5%;
      background-color: #99a9bf;
    }

    .top_right{
      width: 40%;
      height: 100%;
      background-color: #99a9bf;
      display: flex;
      flex-direction: column;

      .pie_title{
        padding-left: 40%;
        font-size: 20px;
        padding-bottom: 5%;
      }
    }
  }
  .bottom{
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: row;
  }
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .imagesUrl{
    display: block;
    height: 100%;
    width: 100%;
  }
</style>
