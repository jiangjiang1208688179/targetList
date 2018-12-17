<template>
  <div class="home">
    <div id="card-flex">
      <div class="card" v-bind:class="{boxTarget:index==nowBox}" @click="nowBoxTarget(index)" v-for="(item, index) in cardList" :key="index">
        <!-- <el-checkbox v-model="checked" v-bind:class="{checkBox:checked}" @change="checkBoxColor">备选项</el-checkbox> -->
        <!-- 该事件不能放在el-cart组件上，会失效 -->
        <div class="cardHead">
          <span>{{item.listId}}</span>
        </div>
        <div class="cardBody">
          <div style="margin-bottom:10px;margin-top:5px;">
            <el-button size="mini" @click="createTarget(index)">新建任务</el-button>
            <div v-show="createItem[index]">
              <input type="text" v-model="createTargetName" class="createInput">
              <el-button size="mini" @click="saveCreateItem(index)">确定</el-button>
              <el-button size="mini" @click="deleteCreateItem">删除</el-button>
              <el-button size="mini" @click="cancel(index)">取消</el-button>
            </div>
          </div>
          <div v-for="(item1,index1) in item.target" :key="index1" class="text item">
            <div class="targetItem" @mouseover="mouseOver(index,index1)" @mouseout="mouseOut(index, index1)">
              <div style="width:30px;height:30px" class="checkBoxStatus" @click="delectItem(index,index1)" v-bind:class="{checkBoxStatus1:item1.status}"></div>
              <div v-show="!(isEdite.a==index && isEdite.b == index1)" v-bind:class="{targetItemStatus:item1.status}">{{item1.name}}</div>
              <!-- 移动、编辑删除操作 -->
              <div class="editDeleteIco" v-show='nowBox==index && item1.mouseOver && !(isEdite.a==index && isEdite.b == index1) || (nowBox==index && !(isEdite.a==index && isEdite.b == index1) && pull.a==index && pull.b==index1)'>
                <!-- 任务移动操作 -->
                <!-- command事件本身有一个回调事件，在添加其它参数时，需要使用$event，来代表它自带的回调事件，否则会出现找不到参数的情况，若不添加其它参数，$event可省略 -->
                <el-dropdown @command="changeTargetBox($event, index, index1)">
                  <span class="el-dropdown-link">
                    移动
                    <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="0">今日目标</el-dropdown-item>
                    <el-dropdown-item command="1">明日目标</el-dropdown-item>
                    <el-dropdown-item command="2">待分配</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <i class="el-icon-edit" @click="editItem(index, index1)"></i>
                <i class="el-icon-delete" @click="deleteItem(index, index1)"></i>
              </div>
              <div v-show="isEdite.a==index && isEdite.b == index1">
                <input type="text" v-model="editeTargetName" class="createInput">
                <el-button style="margin-left:10px;" size="mini" @click="saveEditeItem(index, index1)">确定</el-button>
                <el-button size="mini" @click="editecancel(index, index1)">取消</el-button>
              </div>
            </div>
          </div>
          <div class="alreadyComplete" @click="alreadyComplete">查看已完成成任务</div>
        </div>

      </div>
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
      nowBox: 0,
      createItem: [false, false, false],
      createTargetName: "",
      checked: false,
      checkBox: false,
      editeTargetName: "",
      pull: { a: -1, b: -1 }, //鼠标最后经过那个item
      isEdite: { a: -1, b: -1 },
      // mouseOver: false,   //鼠标经过控制删除和编辑按钮
      cardList: [
        {
          listId: "今日计划",
          target: [
            {
              name: "the first",
              status: false,
              isDelete: false,
              completeDate: {},
              chooseList: 0,
              mouseOver: false
            },
            {
              name: "the second",
              status: false,
              isDelete: false,
              completeDate: {},
              chooseList: 0,
              mouseOver: false
            },
            {
              name: "the thire",
              status: false,
              isDelete: false,
              completeDate: {},
              chooseList: 0,
              mouseOver: false
            }
          ]
        },
        {
          listId: "明日计划",
          target: [
            {
              name: "the first1",
              status: false,
              isDelete: false,
              completeDate: {},
              chooseList: 0,
              mouseOver: false
            },
            {
              name: "the second1",
              status: false,
              isDelete: false,
              completeDate: {},
              chooseList: 0,
              mouseOver: false
            },
            {
              name: "the thire1",
              status: false,
              isDelete: false,
              completeDate: {},
              chooseList: 0,
              mouseOver: false
            }
          ]
        },
        {
          listId: "待完成",
          target: [
            {
              name: "the first2",
              status: false,
              isDelete: false,
              completeDate: {},
              chooseList: 0,
              mouseOver: false
            },
            {
              name: "the second2",
              status: false,
              isDelete: false,
              completeDate: {},
              chooseList: 0,
              mouseOver: false
            },
            {
              name: "the thire2",
              status: false,
              isDelete: false,
              completeDate: {},
              chooseList: 0,
              mouseOver: false
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
    delectItem(index, index1) {
      console.log(index, "  ", index1);
      this.cardList[index].target[index1].status = !this.cardList[index].target[
        index1
      ].status;
    },
    checkBoxColor() {
      this.checkBox = !this.checkBox;
    },
    //创建一个新的target
    createTarget(index) {
      this.createTargetName = "";
      this.createItem.splice(index, 1, true);
      // this.createItem[index] = true;
    },
    saveCreateItem(index) {
      if (this.createTargetName != "") {
        this.cardList[index].target.unshift({
          name: this.createTargetName,
          status: false,
          isDelete: false,
          completeDate: {},
          chooseList: index
        });
      } else {
        console.log("提示要关闭");
      }
      this.cancel(index);
    },
    editItem(index, index1) {
      console.log(index, index1);
      this.isEdite.a = index;
      this.isEdite.b = index1;
      var now = this.cardList[index].target[index1];
      this.editeTargetName = now.name;
      // this.cardList[index].target.splice(index1, 1, now);
    },
    cancel(index) {
      this.createItem.splice(index, 1, false);
      // this.createItem[index] = false;    //使用该方法数组元素改变，但是不会在视图上显示
    },
    deleteCreateItem() {
      this.createTargetName = "";
    },
    //单个target相关操作
    mouseOver(index, index1) {
      var now;
      this.pull.a = index;
      this.pull.b = index1;
      this.cardList[index].target[index1].mouseOver = true;
      now = this.cardList[index];
      this.cardList.splice(index, 1, now);
    },
    mouseOut(index, index1) {
      var now;
      this.cardList[index].target[index1].mouseOver = false;
      now = this.cardList[index];
      this.cardList.splice(index, 1, now);
    },
    //删除编辑项目
    deleteItem(index, index1) {
      this.cardList[index].target.splice(index1, 1);
    },
    changeTargetBox(event, index, index1) {
      console.log(event, index, index1);
      if (event != index) {
        var target = this.cardList[index].target[index1];
        console.log(target);
        if (event == "0") {
          this.cardList[0].target.unshift(target);
          this.cardList[index].target.splice(index1, 1);
        }
        if (event == "1") {
          this.cardList[1].target.unshift(target);
          this.cardList[index].target.splice(index1, 1);
        }
        if (event == "2") {
          this.cardList[2].target.unshift(target);
          this.cardList[index].target.splice(index1, 1);
        }
      }
    },
    saveEditeItem(index, index1) {
      if (this.editeTargetName) {
        this.cardList[index].target[index1].name = this.editeTargetName;
        this.editecancel(index, index1);
      }
    },
    editecancel(index, index1) {
      this.isEdite.a = -1;
      this.isEdite.b = -1;
      // var now = this.cardList[index].target[index1];
      // this.cardList[index].target.splice(index1, 1, now);
    },
    alreadyComplete(index, index1){
      var date, completeDate = new Date();
      date.year =  completeDate.getFullYear();
      date.month = completeDate.getMonth()+1;
      date.day = completeDate.getDate();
      date.week = completeDate.getDay();
      this.cardList[index].target[index1].completeDate = date;
    }
  }
};
</script>
<style>
#card-flex {
  display: flex;
  display: -webkit-flex; /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-flex; /*OLD - Firefox 19- H5不用考虑 */
  display: -mz-flex; /*TWEENER IE 10 */
  display: -ms-flex;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  -moz-justify-content: space-around;
  -o-justify-content: space-around;
  -ms-justify-content: space-around;

  align-items: flex-start;
  -webkit-align-items: flex-start;
  -moz-align-items: flex-start;
  -o-align-items: flex-start;
  -ms-align-items: flex-start;
}
.card {
  /* display: block; */
  text-align: left;
  border: 1px solid #dcdcdc;
  width: 30%;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #dcdcdc;
}
.cardHead {
  padding: 10px;
  border-bottom: 1px solid #dcdcdc;
}
.cardBody {
  padding: 10px;
}
.item {
  margin-bottom: 14px;
}
.text {
  font-size: 18px;
  text-align: left;
}
.cardContain {
  text-align: left;
  margin-top: 0px;
}
/* 
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
  width: 30%;
} */
.boxTarget {
  /* display: inline-block; */
  width: 30%;
  border: 1px solid #409dff;
  border-radius: 5px;
}
.createInput {
  -web-kit-appearance: none;
  -moz-appearance: none;
  border: 0px;
  border-bottom: 2px solid #409dff;
  height: 22px;
  font-size: 18px;
}
.targetItem div {
  display: inline-block;
}
.targetItemName {
  margin-left: 12px;
  margin-right: 20px;
}
.targetItemStatus,
.checkBox {
  color: #dcdcdc;
}
.checkBoxStatus {
  background-image: url("../assets/checkBox.svg");
  background-repeat: no-repeat;
  background-size: 25px;
  margin-bottom: -12px;
}
.checkBoxStatus1 {
  background-image: url("../assets/checkBox1.svg");
}
.editDeleteIco {
  margin-left: 30px;
}
.editDeleteIco i {
  display: inline-block;
  margin-left: 15px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.alreadyComplete{
  font-size: 12px;
  color: #409eff;
}
</style>