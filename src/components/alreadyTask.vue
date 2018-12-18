<template>
  <div class="alreadyTarg">
    <h3>已完成的任务</h3>
    <!-- <div>{{dateTarget}}</div> -->
    <div class="alreadyItem" v-for="(item, index) in alreadyList" v-bind:key="index">
      <div class="completeDate">
        <div>{{item.date.date}}</div>
        <div class="ww">{{item.date.ww}}</div>
      </div>
      <div class="completeItem">
        <div v-for="(item1, index1) in item.name" v-bind:key="index1">{{item1}}</div>
      </div>
      <!-- <div style="display:block;width:1000px;height:1px;background-color:#ccc"></div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "alreadyTask",
  props:['dateTarget'],  //dateTarget的数据类型是: [{ date: 1545099084455, name: "a1" }]
  data() {
    return {
      alreadyList: {},
      dateTarget1:[]
    };
  },
  methods: {
    transDate(n) {
      //日期格式转换
      var date1 = {},
        d = new Date(n),
        date = [];
              
      date[0] = d.getFullYear();
      date[1] = d.getMonth() + 1;
      date[2] = d.getDate();
      date1.date = date.join("-");
      date1.ww = this.getWW(d.getDay() + 1); //将数字转换成星期一、星期二...
      return date1; //返回一个对象，包含具体哪一天，以及周几
    },
    getWW(n) {
      switch (n) {
        case 1:
          return "星期一";
          break;
        case 2:
          return "星期二";
          break;
        case 3:
          return "星期三";
          break;
        case 4:
          return "星期四";
          break;
        case 5:
          return "星期五";
          break;
        case 6:
          return "星期六";
          break;
        case 7:
          return "星期日";
          break;
      }
    },
    mapAlreadyDate(arr) {
      let newArr = []; //按天存储,哪一天完成了什么内容,最终显示的数据结构
      // [{date:{date:2018-12-12,ww:'星期一'},name:[target1,target2]}]
      for (var date of arr) {
        let date1 = this.transDate(date.date);  //date1有两个参数，一个date:2018-12-12，一个ww:星期几
        let index = -1;
        let alreadyExists = newArr.some((newDate, j) => {
                  // console.log(date1.date, newDate.date.date);
          if (date1.date === newDate.date.date) {   //此处注意条件的判断
            index = j;
            return true;
          }
        });
        if (!alreadyExists) {
          newArr.push({
            date: date1,
            name: [date.name]
          });
        } else {
          newArr[index].name.push(date.name);
        }
      }
      return newArr;
    }
  },
  watch: {
    dateTarget: function (val) {
      this.alreadyList = this.mapAlreadyDate(this.dateTarget);
    }
  }
  // mounted() {
  //   console.log(this.dateTarget);
  //   this.alreadyList = this.mapAlreadyDate(this.dateTarget)
  // },
  
};
</script>
<style>
.alreadyTarg{
  width: 80%;
  border: 1px solid #cccccc;
  border-radius: 5px;
}
.alreadyItem{
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
  border-bottom: 1px solid #ccc;
}
.alreadyItem div{
  display: inline-block;
}
.completeDate{
  width: 300px;
}
.ww{
  font-size: 12px;
  padding-left:0px;
  color: #ccc;
}
.completeDate div{
  padding:10px;
}
.completeItem{
  margin-top: 15px;
  width: 300px;
}
.completeItem div{
  padding: 5px;
  display: block;
}
.completeDateWw{
  color: #ccc;
}
</style>
