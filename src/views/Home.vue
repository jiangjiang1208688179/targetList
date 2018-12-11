<template>
  <div class="home">
    
      <div @click="nowBoxTarget(index)" v-for="(item, index) in cardList" :key="index" class="box-card" v-bind:class="{boxTarget:index==nowBox}">
        <el-card >
        <!-- 该事件不能放在el-cart组件上，会失效 -->
        <div slot="header" class="clearfix">
          <span>{{item.lid}}</span>
          <el-button style="float: right; padding: 3px 0" type="text">所有列表</el-button>
        </div>
        <div class="cardContain">
          <div v-for="(item1,index1) in item.target" :key="index1" class="text item" @click="delectItem(index,index1)"  v-bind:class="{targetItemStatus:item1.status}">
            <div  class="targetItem" >
              <div>选择</div>
              <div>{{item1.name}}</div>
              <div>删除</div>
            </div>
        </div>
        </div>
        </el-card>
      </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "home",
  data() {
    return {
      nowBox: 1,
      checked: false,
      cardList: [
        {
          lid: "今日计划",
          target: [
            {
              name: "the first",
              status: false
            },
            {
              name: "the second",
              status: false
            },
            {
              name: "the thire",
              status: false
            }
          ]
        },
        {
          lid: "明日计划",
          target: [
            {
              name: "the first"
            },
            {
              name: "the second"
            },
            {
              name: "the thire"
            }
          ]
        },
        {
          lid: "待完成",
          target: [
            {
              name: "the first"
            },
            {
              name: "the second"
            },
            {
              name: "the thire"
            }
          ]
        }
      ]
    };
  },
  methods: {
    nowBoxTarget(index) {
      this.nowBox = index;
    },
    delectItem(index,index1){
      console.log(index,'  ',index1)
      this.cardList[index].target[index1].status = !this.cardList[index].target[index1].status;

    }
  }
};
</script>
<style>
.cardContain{
  margin-top:30px;
}
.text {
  font-size: 14px;
  text-align: left;
}

.item {
  margin-bottom: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  display: inline-block;
  margin: 20px;
  width: 20%;
}
.boxTarget {
  width: 30%;
  border: 1px solid #409dff;
}
.targetItem div{
  display: inline-block;
}
.targetItemName{
  margin-left: 12px;
  margin-right: 20px;
}
.targetItemStatus{
  color: #ccc;
}
</style>