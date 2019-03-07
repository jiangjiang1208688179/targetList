<template>
    <div>
        <div class="tableFilter">
            <div class="class1">
                <span>按类别排序:</span>
                <el-select v-model="classValue" filterable no-match-text placeholder="请选择" @change="handleClass">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search">
                 <!--@keyup.enter在el-input,el-button标签中是会失效的，但是在button和input标签中是可以的，所以在el-input标签中要用@keyup.enter.native-->
                <el-input v-model="searchKey" placeholder="请输入搜索关键字" @keyup.enter.native="handleSearch()">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch()"></i>
                </el-input>
            </div>
        </div>
        <el-table id='tableId' :data="currentPageList" border style="width:100%;margin-top:50px">
            <el-table-column prop="name" label="姓名" sortable width="200" v-show="searchRes"></el-table-column>
            <el-table-column prop="date" label="出生日期" sortable width="250" v-show="searchRes"></el-table-column>
            <el-table-column prop="address" sortable label="地址" v-show="searchRes"></el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totall" @current-change="handleCurrectPage"></el-pagination>
    </div>
</template>
<script>
import tableList from "../assets/tableInfor.js";
export default {
  name: "table-2",
  data() {
    return {
      tableList: [], //存储从后台请求到的所有数据
      tableList1: [], //保存从后台请求到的最原始的数据,主要是为了后边查询搜索关键字的变动
      totall: 0, //统计后台请求数据的总条数
      pageSize: 15, //每页显示的数据条数
      currentPage: 1, //当先显示的分页面，默认为1
      currentPageList: [], //存放当前页面的所有数据

      options: [
        {
            value:0,
            label: '所有'
        },{
            value: 1,
            label: '姓名'
        },
        {
            value: 2,
            label: '出生日期'
        },
        {
            value:3,
            label: '地址'
        }],
        classValue: '',  //该变量来控制options中选的是那个，好进行排序
        searchKey: '',
        searchRes: true
    };
  },
  methods: {
    getCurrectPageList(page) { //page是从1开始的 
      //通过slice(start,end)方法返回新的数组列表，start以下标0开始
      var start = (page - 1) * this.pageSize;
      var end; //结束有几种情况：1、该页是满的；2、该页未满
      this.totall = this.tableList.length;
      if (this.tableList.length >= start + this.pageSize) {
        end = start + this.pageSize;
      } else{
          end = this.tableList.length;
      }
      this.currentPageList = this.tableList.slice(start, end);
    },
    getFormInfor() {
      this.tableList = tableList.list;
      this.tableList1 = tableList.list;
      this.totall = this.tableList.length;
    },
    getNullTableList(){
        this.tableList = [];
    },
    handleCurrectPage(val) {
      //var会获取当前点击的页数
      this.currentPage = val;
      this.getCurrectPageList(val);
    },
    handleClass(key){ //返回下拉列表的value值，此处是0、1、2、3
        console.log(key)
    },
    handleSearch(){  //此方法遍历查询    this.classValue :按照什么分类查(0-3 || null)  this.searchKey：查询某个关键字
    //分 
        var orderList = ['all','name','date', 'address']
        console.log(this.classValue);
        if(this.searchKey){
            this.getNullTableList();
        }
        // else if(!this.searchKey && this.classValue == 0){  //这一步会死机
        //     this.tableList = this.tableList1;
        //     console.log(this.tableList);
        // }
        else if(!this.searchKey && this.classValue == ''){
            this.$message.warning("查询条件不能为空！");
            return;
        }
        if (this.classValue==0 || this.classValue == ''){
            //  按照所有的排序,多次循环，先按照name，再按照date，再按照address
            let arr = [];
            for (let i=1; i<orderList.length; i++){
                for( let [index, item] of this.tableList1.entries()){ 
                    if(item[orderList[i]].includes(this.searchKey)){
                        if (!arr.includes(index)){
                            arr.push(index);
                            this.tableList.push(item);
                        }
                    }
                }
            }
        } else{
            for(let item of this.tableList1){  //按照 name date address三种分类
                if(item[orderList[this.classValue]].includes(this.searchKey)){
                    this.tableList.push(item);
                }
            }
        }
        this.getCurrectPageList(1);
        console.log(this.tableList);
    }
  },
  mounted() {
    this.getFormInfor();
    this.getCurrectPageList(this.currentPage);
  }
};
</script>
<style scoped>
.tableFilter {
  width: 100%;
  height: 10px;
}
.tableFilter div{
    display: inline-block;
    margin-left: 10px;
    margin-right:10px;
}
.searchImg{
    width: 32px;
    height: 32px;
    margin-right: 5px;
}
.search i{
    cursor: pointer;
}
</style>