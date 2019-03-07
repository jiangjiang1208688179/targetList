<template>
    <div>
        <el-table
            id='tableId'
            :data="currentPageList"
            border
            style="width:100%">
            <el-table-column prop="name" label="姓名" width="200"></el-table-column>
            <el-table-column prop="date" label="出生日期" width="250"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totall" @current-change="handleCurrectPage"></el-pagination>
    </div>
</template>
<script>
import tableList from '../assets/tableInfor.js'
export default {
    name: 'form',
    data() {
        return {
            tableList: [],  //存储从后台请求到的所有数据
            totall:0,       //统计后台请求数据的总条数
            pageSize: 15, //每页显示的数据条数
            currentPage:1, //当先显示的分页面，默认为1
            currentPageList:[]  //存放当前页面的所有数据
        }
    },
    methods:{
        getCurrectPageList(page){  //通过slice(start,end)方法返回新的数组列表，start以下标0开始
            var start = (page-1)*(this.pageSize);
            var end;   //结束有几种情况：1、该页是满的；2、该页未满
            if(this.tableList.length >= (start+this.pageSize)){
                end = start + this.pageSize;
            } else {
                end = this.tableList.length;
            }
                this.currentPageList = this.tableList.slice(start,end);
        },
        getFormInfor(){
            this.tableList = tableList.list;
            this.totall = this.tableList.length;
        },
        handleCurrectPage(val){ //var会获取当前点击的页数
            this.currentPage = val;
            this.getCurrectPageList(val);
        }
    },
    mounted(){
        this.getFormInfor();
        this.getCurrectPageList(this.currentPage);
    }
}
</script>
<style scoped>
</style>