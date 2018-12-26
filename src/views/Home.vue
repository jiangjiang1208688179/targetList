<template>
  <div class="home" style="align:center">
    <div id="card-flex" v-show="!isAlready">
      <div class="card" v-bind:class="{boxTarget:index==nowBox}" @click="nowBoxTarget(index)" v-for="(item, index) in cardList" :key="index">
        <!-- <el-checkbox v-model="checked" v-bind:class="{checkBox:checked}" @change="checkBoxColor">备选项</el-checkbox> -->
        <!-- 该事件不能放在el-cart组件上，会失效 -->
        <div class="cardHead">
          <span>{{item.listId}}</span>
        </div>
        <div class="cardBody">
          <div style="margin-bottom:10px;margin-top:5px;">
            <el-button size="mini" @click="createTarget(index)">新建任务</el-button>
            <div v-show="createItem[index].status" class="addOption">
              <input type="text" v-model="createTargetName" class="createInput" @keyup.enter="saveCreateItem(index)">
              <div @click="saveCreateItem(index)">确定</div>
              <div size="mini" @click="deleteCreateItem">删除</div>
              <div size="mini" @click="cancel(index)">取消</div>
            </div>
          </div>
          <div v-for="(item1,index1) in item.target" :key="index1" class="text item">
            <div class="targetItem" @mouseover="mouseOver(index,index1)" @mouseout="mouseOut(index, index1)">
              <div style="width:30px;height:30px" class="checkBoxStatus" @click="idFinished(index,index1)" v-bind:class="{checkBoxStatus1:item1.is_finished}"></div>
              <div v-show="!(isEdite.a==index && isEdite.b == index1)" v-bind:class="{targetItemStatus:item1.is_finished}">{{item1.content}}</div>
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
    <div v-show="isAlready" @click="isAlreadyO" style="width:50%;height:30px;margin-left:25%;margin-right:25%;margin-bottom:-5px;background-color:#F0B775;border-radius:5px;position:absolute;color:white;line-height:30px;">返回首页</div>
    <already-task v-bind:dateTarget="dateTarget" v-show="isAlready" style="position:absolute;margin-top:30px;"></already-task>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";
import alreadyTask from "@/components/alreadyTask.vue";
export default {
  name: "home",
  components: {
    alreadyTask
  },
  data() {
    return {
      dateTarget: [],
      nowBox: 0,
      createItem: [
        { status: false, id: "5c2119db72836e4541b1fdfe" },
        { status: false, id: "5c21f725c13ebb4ae6df1d00" },
        { status: false, id: "5c22f19ac13ebb65c641c609" }
      ], //确定当前是在那个地方创建新任务
      createTargetName: "",
      checked: false,
      checkBox: false,
      editeTargetName: "",
      pull: { a: -1, b: -1 }, //鼠标最后经过那个item
      isEdite: { a: -1, b: -1 },
      isAlready: false,
      // mouseOver: false,   //鼠标经过控制删除和编辑按钮
      cardList: [
        {
          listId: "今日计划",
          target: []
        },
        {
          listId: "明日计划",
          target: []
        },
        {
          listId: "今待安排",
          target: []
        }
      ]
    };
  },

  mounted() {
    this.cardlist();
  },
  methods: {
    // mock数据模拟方法cardlist()
    cardlist() {
      axios.get("/api/task/get_tasks").then(res => {
        var list = res.data.data;
        for (var item of list) {
          if (item.todolist_id == "5c2119db72836e4541b1fdfe") {
            this.cardList[0].target.push(item);
          } else if (item.todolist_id == "5c21f725c13ebb4ae6df1d00") {
            this.cardList[1].target.push(item);
          } else if (item.todolist_id == "5c22f19ac13ebb65c641c609") {
            this.cardList[2].target.push(item);
          }
        }
        console.log("2324", this.cardList);
      });
    },
    nowBoxTarget(index) {
      this.nowBox = index;
    },
    idFinished(index, index1) {
      // console.log(index, "  ", index1);
      this.cardList[index].target[index1].is_finished = !this.cardList[index]
        .target[index1].is_finished;
      this.cardList[index].target[index1].complete_time = new Date().getTime();
    },
    checkBoxColor() {
      this.checkBox = !this.checkBox;
    },
    //创建一个新的target
    createTarget(index) {
      var now = this.createItem[index];
      now.status = true;
      this.createTargetName = "";
      this.createItem.splice(index, 1, now);
      // this.createItem[index].status = true;
    },
    saveCreateItem(index) {
      if (this.createTargetName != "") {
        axios
          .post("/api/task/add", {
            todolist_id: this.createItem[index].id,
            content: this.createTargetName
          })
          .then(res => {
            var result = res.data;
            if (result.code == 20000) {
              this.cardList[index].target.unshift(result.data);
            }
          });
      } else {
        console.log("提示是否要关闭");
      }
      this.cancel(index);
    },
    editItem(index, index1) {
      console.log(index, index1);
      this.isEdite.a = index;
      this.isEdite.b = index1;
      var now = this.cardList[index].target[index1];
      this.editeTargetName = now.content;
      // this.cardList[index].target.splice(index1, 1, now);
    },
    cancel(index) {
      var now = this.createItem[index];
      now.status = false;
      this.createItem.splice(index, 1, now);
      // this.createItem[index].status = false;    //使用该方法数组元素改变，但是不会在视图上显示
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
        this.cardList[index].target[index1].content = this.editeTargetName;
        this.editecancel(index, index1);
      }
    },
    editecancel(index, index1) {
      this.isEdite.a = -1;
      this.isEdite.b = -1;
      // var now = this.cardList[index].target[index1];
      // this.cardList[index].target.splice(index1, 1, now);
    },
    isAlreadyO() {
      this.isAlready = false;
    },
    alreadyComplete() {
      var date = [];
      this.isAlready = true;
      //循环出列表中所有is_finished为true的 name和complete_time,形成一个新的数组，传给dateTarget变量最终传给子组件
      for (let i = 0; i < this.cardList.length; i++) {
        for (let j = 0; j < this.cardList[i].target.length; j++) {
          var item = this.cardList[i].target[j];
          if (item.is_finished) {
            var k = {};
            k.date = item.complete_time;
            k.content = item.content;
            date[date.length] = k;
            this.cardList[i].target.splice(j, 1); //此处是为了在返回时，删除已经勾选的项目,但是splice的删除功能在for循环中是有坑的，会导致小标错乱，所以没删除一个，自动将循环的参数j--
            j--;
          }
        }
        // for(let [index,item] of this.cardList[i].target.entries()){ //这里用到了for...of 的索引，所以需要添加entries()
        //   if(item.is_finished) {
        //     //vue中需要注意的是，使用对象a.xx的时候,必须先要定义a的类型是‘对象’， 否者一直会报错
        //     var k = {};
        //     k.date = item.complete_time;
        //     k.content = item.content;
        //     date[date.length] = k;
        //     console.log('111111',i,'  ',index);
        //     this.cardList[i].target.splice(index, 1);//此处是为了在返回时，删除已经勾选的项目
        //     index--;
        //   }
        // }
      }
      this.dateTarget = date;
    }
  }
};
</script>
<style>
.home {
  text-align: center;
}
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
  background-image: url("../../img/bag5.jpg");
  background-size: 100% 100%;
  text-align: left;
  border: 1px solid #dcdcdc;
  width: 30%;
  /* border-:5px;: 5px; */
  box-shadow: 0px 0px 10px #dcdcdc;
}
.cardHead {
  padding: 10px;
  border-bottom: 1px solid #dcdcdc;
}
.cardBody {
  padding: 10px;
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 5%;
}
.item {
  margin-bottom: 14px;
}
.addOption {
  margin-top: 10px;
}
.addOption div {
  display: inline-block;
  width: 30px;
  height: 15px;
  font-size: 14px;
  margin-left: 8px;
  color: #409eff;
  cursor: pointer;
}
.text {
  font-size: 18px;
  text-align: left;
}
.cardContain {
  text-align: left;
  margin-top: 0px;
}
.boxTarget {
  /* display: inline-block; */
  width: 30%;
  border: 4px solid #a8dba8;
  border-radius: 5px;
}
.createInput {
  width: 60%;
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
.el-icon-edit,
.el-icon-delete {
  cursor: pointer;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.alreadyComplete {
  cursor: pointer;
  font-size: 12px;
  color: #409eff;
}
</style>