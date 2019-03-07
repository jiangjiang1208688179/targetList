<template>
  <div>
    <ve-scatter :data="chartData" width="900px" :settings="chartsettings" :events="chartEvents"></ve-scatter>
  </div>
</template>
<script>
export default {
  name: 'vChart',
  data(){
    this.chartsettings = {
      dataType: {
          '访问用户': 'KMB',
          '年龄': 'percent',
          '下单用户': 'normal'
        }
    }
    this.chartEvents = {
        click: function(e){
          console.log(e,'dwr');
        }
      }
    return{
      chartData: {
          columns: ['日期', '访问用户', '下单用户', '增量'],
          rows:{
            'CD': [
            { '日期': '2018-05-22', '访问用户': 32371, '下单用户': 19810, '增量': 8845},
            { '日期': '2018-05-23', '访问用户': 12328, '下单用户': 4315498, '增量': 8585},
            { '日期': '2018-05-24', '访问用户': 92381, '下单用户': 52910, '增量': 885 }
          ],
          'GZ': [
            { '日期': '2018-05-22', '访问用户': 26, '下单用户': 5665825, '增量': 81285},
            { '日期': '2018-05-23', '访问用户': 1545, '下单用户': 4398, '增量': 858235},
            { '日期': '2018-05-24', '访问用户': 9381, '下单用户': 52910, '增量': 885 }
          ]}
      }
    }
  },
  methods:{
    // chartEvents(){
    //   console.log('wrer');
    // }
  }
}
</script>
<style scoped>
</style>
