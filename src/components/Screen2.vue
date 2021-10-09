<template>
  <div>
    <h1>第二屏</h1>
    <div class="chart-box"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

onMounted(() => {
  const chartDom = document.querySelector('.chart-box') as HTMLElement
  const myChart = echarts.init(chartDom, undefined, { renderer : 'svg' })
  let option: EChartsOption

  const data: number[] = []
  for (let i = 0; i < 13; ++i) {
    data.push(Math.round(Math.random() * 200))
  }

  option = {
    xAxis: {
      max: 'dataMax'
    },
    yAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 7 // only the largest 3 bars will be displayed
    },
    series: [
      {
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: data,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        }
      }
    ],
    legend: {
      show: true
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  }

  function run() {
    for (var i = 0; i < data.length; ++i) {
      if (Math.random() > 0.9) {
        data[i] += Math.round(Math.random() * 2000)
      } else {
        data[i] += Math.round(Math.random() * 200)
      }
    }
    myChart.setOption<echarts.EChartsOption>({
      series: [
        {
          type: 'bar',
          data
        }
      ]
    })
  }

  setTimeout(function () {
    run()
  }, 0)
  setInterval(function () {
    run()
  }, 3000)

  option && myChart.setOption(option)
})
</script>
<style lang="scss" scoped>
.chart-box {
  width: 1600px;
  height: 800px;
  margin: 160px auto;
}
</style>
