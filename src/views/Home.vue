<template>
  <div class="home">
    <div @click="nowBoxTarget(index)" v-for="(item, index) in cardList" :key="index" class="box-card" v-bind:class="{boxTarget:index==nowBox}">
      <el-card>
        <!-- <el-checkbox v-model="checked" v-bind:class="{checkBox:checked}" @change="checkBoxColor">备选项</el-checkbox> -->
        <!-- 该事件不能放在el-cart组件上，会失效 -->
        <div slot="header" class="clearfix">
          <span>{{item.listId}}</span>
          <el-button style="float: right; padding: 3px 0" type="text">所有列表</el-button>
        </div>
        <div class="cardContain">
          <div style="margin-bottom:10px;">
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
              <div v-bind:class="{targetItemStatus:item1.status}">{{item1.name}}</div>
              <!-- 编辑删除操作 -->
              <div class="editDeleteIco" v-show='item1.mouseOver'>
                <!-- 任务移动操作 -->
                <el-dropdown @command="changeTargetBox(index1, index)">
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
      createItem: [false, false, false],
      createTargetName: "",
      checked: false,
      checkBox: false,
      // mouseOver: false,   //鼠标经过控制删除和编辑按钮
      cardList: [
        {
          listId: "今日计划",
          target: [
            {
              name: "the first",
              status: false,
              isDelete: false,
              completeDate: "",
              chooseList: 0,
              mouseOver: false
            },
            {
              name: "the second",
              status: false,
              isDelete: false,
              completeDate: "",
              chooseList: 0,
              mouseOver: false
            },
            {
              name: "the thire",
              status: false,
              isDelete: false,
              completeDate: "",
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
              completeDate: "",
              chooseList: 0
            },
            {
              name: "the second1",
              status: false,
              isDelete: false,
              completeDate: "",
              chooseList: 0
            },
            {
              name: "the thire1",
              status: false,
              isDelete: false,
              completeDate: "",
              chooseList: 0
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
              completeDate: "",
              chooseList: 0
            },
            {
              name: "the second2",
              status: false,
              isDelete: false,
              completeDate: "",
              chooseList: 0
            },
            {
              name: "the thire2",
              status: false,
              isDelete: false,
              completeDate: "",
              chooseList: 0
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
          completeDate: "",
          chooseList: index
        });
      } else {
        console.log("提示要关闭");
      }
      this.cancel(index);
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
    changeTargetBox(command, index, index1) {
      console.log(command, index, index1)
      if (command != index) {
        var target = this.cardList[index].target[index1];
        console.log(target)
        if (command == "0") {
          this.cardList[0].target.unshift(target);
          this.cardList[index].target.splice(index1,1);
        }
        if (command == "1") {
          this.cardList[1].target.unshift(target);
          this.cardList[index].target.splice(index1,1);
        }
        if (command == "2") {
          this.cardList[2].target.unshift(target);
          this.cardList[index].target.splice(index1,1);
        }
      }
    }
  }
};
</script>
<style>
.cardContain {
  text-align: left;
  margin-top: 0px;
}
.text {
  font-size: 18px;
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
  width: 30%;
}
.boxTarget {
  /* width: 30%; */
  border: 1px solid #409dff;
  border-radius: 5px;
}
.createInput {
  -web-kit-appearance: none;
  -moz-appearance: none;
  border: 0px;
  border-bottom: 2px solid #409dff;
  height: 25px;
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
  color: #ccc;
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
</style>