<template>
  <el-row class="home" :gutter="20">
    <!-- :span为el-col的专属属性，意思是这一列col占据8分栏 -->
    <!-- :gutter为el-row的专属属性，意思是这一行的每列col间隔20 -->
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/user.png" alt="" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>test</span></p>
          <p>上次登录地点:<span>test</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <!-- el-table 传入表单的数据 -->
        <el-table :data="tableData">
          <!-- 在el-table里创建每一列，每一列的数据用prop来映射，prop为表单域的module，也就是说每一列的prop值是什么，那么这一列的数据就会呈现data里的键位prop值得数据 -->
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <!-- 这里我犯了错误，:是v-bind的绑定缩写，绑的是属性，不是v-for这样的指令，结果看了几个小时报错不知道错纳。。。 -->
        <el-card
          v-for="item in countData"
          :body-style="{ display: 'flex', padding: 0 }"
          :key="item.name"
        >
          <component
            class="icons"
            :is="item.icon"
            :style="{ background: item.color }"
          ></component>
          <div class="details">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <div>
        <el-card style="height: 280px">
          <div ref="echart" style="height: 280px"></div>
        </el-card>
      </div>
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="userechart" style="height: 240px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="videochart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "vue";
import * as echarts from "echarts";
export default defineComponent({
  setup() {
    // 在vue3中，你要实现数据的双向绑定不能这么写
    // const tableData = [
    //     {
    //         name: "oppo",
    //         todayBuy: 1200,
    //         monthBuy: 4500,
    //         totalBuy: 65000
    //     },
    //     {
    //         name: "小米",
    //         todayBuy: 1200,
    //         monthBuy: 6500,
    //         totalBuy: 45000,
    //     },
    //     {
    //         name: "三星",
    //         todayBuy: 300,
    //         monthBuy: 2000,
    //         totalBuy: 34000,
    //     },
    //     {
    //         name: '魅族',
    //         todayBuy: 350,
    //         monthBuy: 3000,
    //         totalBuy: 22000,
    //     }
    // ]
    // 需要使用vueComponent的api ref实现绑定
    const { proxy } = getCurrentInstance();
    const tableData = ref([]);
    const countData = ref([]);
    const tableLabel = {
      name: "课程",
      totdayBuy: "今日购买",
      monthBuy: "今月购买",
      totalBuy: "总购买",
    };
    // echarts 表格渲染部分
    let xOptions = reactive({
      legend: {
        // 图例文字颜色
        textStyle: {
          color: "#333",
        },
      },
      // grid为图，你可以设置这个图的基本信息。
      // left:可以设置具体数值，也可以设置百分比，根据容器设置百分比
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },

        // axisLabel 坐标轴标签， interval：间隔， x轴的标签会隔 设置的值 去显示一个，设置0则全部显示
        axisLabel: {
          interval: 8,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
    });

    let pieOptions = reactive({
      tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      serires: [],
    });

    let orderData = reactive({
      xData: [],
      series: [],
    });

    let userData = reactive({
      xData: [],
      series: [],
    });

    let videoData = reactive({
      series: [],
    });

    // 我们使用mock拦截我们的api请求，其实我们使用axios发出的get请求返回的东西时mock发出来的，是自己定义的
    // 这里使用了异步函数 async。 我们要用async函数是因为我们要写的这个函数里面包含了一些异步操作，因为要等待async的函数体的一些异步操作的实现，所以async函数无论return了什么东西，他都是个promise对象(需要等待事件处理的异步对象)，而return的东西是这个promise对象resolve出来的东西。promise对象处理完毕后可以用then方法的参数接受处理
    // async函数在函数体里面可以使用关键字await，await是用来等待promise对象的，它用于等待一个Promise完成，会返回其解决的值或抛出其拒绝的错误。
    // 注意：promise对象是可以链式调用，async调用了then或者catch方法他的返回仍然是promise对象
    // axios.get返回的东西需要异步等待，是一个promise对象，

    //  这是二次封装前写法， 不二次封装发包，那会导致代码很臃肿，每一次相似重复的请求会在这里一遍又一遍的写。

    // const getTableList = async () => {
    //     await axios.get("/home/getData").then((res)=>{
    //         // console.log(res)
    //         // ref对象的value属性用来动态设置数据的
    //         if (res.data.code == 200)
    //         tableData.value = res.data.data.tableData
    //     })
    // }

    const getTableList = async () => {
      let res = await proxy.$api.getTableData();
      tableData.value = res;
    };

    const getCountData = async () => {
      let res = await proxy.$api.getCountData();
      countData.value = res;
    };

    const getChartData = async () => {
      let result = await proxy.$api.getChartData();
      let res = result.orderData;
      let userRes = result.userData;
      let videoRes = result.videoData;
      orderData.xData = res.date;
      // 返回传入对象自身的 可枚举的 字符串键属性名 组成的数组。
      const keyArray = Object.keys(res.data[0]);
      const series = [];
      // res.data里面有很多个对象，每个对象里面有着相同的属性(品牌)，但映射的值不是一样的(价格)
      // 这个series是对象数组，每个对象是一个品牌，里面的data是res.data里所有对象的映射出来的值的数组。
      // type: line
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: res.data.map((item) => item[key]),
          type: "line",
        });
      });

      // 渲染
      orderData.series = series;
      xOptions.xAxis.data = orderData.xData;
      xOptions.series = orderData.series;
      let hEcharts = echarts.init(proxy.$refs["echart"]);
      hEcharts.setOption(xOptions);

      // 柱状图
      // userData.xData为星期一到星期日
      userData.xData = userRes.map((item) => item.date);
      // userData.series为：两个对象的数组，分别代表了活跃用户与日常用户在星期一到星期日的数量
      userData.series = [
        {
          name: "新增用户",
          data: userRes.map((item) => item.new),
          type: "bar",
        },
        {
          name: "活跃用户",
          data: userRes.map((item) => item.active),
          type: "bar",
        },
      ];

      xOptions.xAxis.data = userData.xData;
      xOptions.series = userData.series;
      let uEcharts = echarts.init(proxy.$refs["userechart"]);
      uEcharts.setOption(xOptions);

      // 饼状图
      videoData.series = [
        {
          data: videoRes,
          type: "pie",
        },
      ];
      pieOptions.series = videoData.series;
      let vEcharts = echarts.init(proxy.$refs["videochart"]);
      vEcharts.setOption(pieOptions);
    };

    onMounted(() => {
      getTableList();
      getCountData();
      getChartData();
    });
    return {
      tableData,
      countData,
      tableLabel,
    };
  },
});
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
}
.login-info {
  p {
    line-height: 30px;
    font-size: 14px;
    color: #999;
    span {
      color: #666;
      margin-left: 70px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .icons {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .details {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .num {
      font-size: 30px;
      margin-bottom: 20px;
    }
    .txt {
      font-size: 14px;
      text-align: center;
      color: #999;
    }
  }
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
