<template>
  <div class="chart">
    <!-- 顶部卡片 -->
    <el-card>
      <ul class="circleBox">
        <li>
          <span class="circle">{{dataList.increment_users}}</span>
          <span>今日新增用户</span>
        </li>
        <li>
          <span class="circle">{{dataList.total_users}}</span>
          <span>总用户量</span>
        </li>
        <li>
          <span class="circle">{{dataList.increment_questions}}</span>
          <span>新增试题</span>
        </li>
        <li>
          <span class="circle">{{dataList.total_questions}}</span>
          <span>总试题量</span>
        </li>
        <li>
          <span class="circle">{{dataList.total_done_questions}}</span>
          <span>总刷题量</span>
        </li>
        <li>
          <span class="circle">{{dataList.personal_questions}}</span>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <!-- 图表区卡片 -->
    <el-card class="content" style="width: 100%;height:562px;">
      <div ref="main" style="width: 100%;height:562px;"></div>
    </el-card>
  </div>
</template>

<script>
// 导入获取数据面板数据的接口
import { getData, getStatistics } from "@/api/chart.js";
// 导入echarts
import echarts from "echarts";

export default {
  data() {
    return {
      // 数据面板的数据源
      dataList: []
    };
  },
  created() {
    // 页面一加载就请求数据面板的数据
    getData().then(res => {
      // console.log(res);
      // 判断
      if (res.data.code === 200) {
        // 给数据面板的数据源赋值
        this.dataList = res.data.data;
      }
    });
  },
  // 因为要操作dom，所以再这个生命周期钩子函数里面操作
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.main);

    // 调用接口获取数据
    getStatistics().then(res => {
      // console.log(res);
      // 判断
      if (res.data.code === 200) {
        // 提取出企业名字
        let names = res.data.data.map(item => {
          return item.name;
        });
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: "整体数据"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            right: 10,
            data: names
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: res.data.data
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    });
  }
};
</script>

<style lang="less">
.chart {
  .circleBox {
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      flex-direction: column;
      list-style: none;
      text-align: center;
      span {
        font-size: 20px;
      }
      .circle {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        width: 130px;
        height: 130px;
        border: 1px solid #2482dd;
        border-radius: 50%;
        margin-bottom: 20px;
      }
    }
  }
  .content {
    margin-top: 20px;
    width: 100%;
  }
}
</style>