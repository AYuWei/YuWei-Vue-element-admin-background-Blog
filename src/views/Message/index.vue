<template>
  <div class="app-container">
    <el-table
      :data="data"
      style="width: 100%; margin-top: 20px"
      border
      v-loading="isLoading"
    >
    <!-- 序号 -->
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <!-- 头像 -->
      <el-table-column prop="date" label="头像"  width="80" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar1" style="width:40px;"></el-image>  
        </template>
      </el-table-column> 
      <!-- 昵称 -->
      <el-table-column prop="date" label="评论人" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column> 
    
      <!-- 评论内容 -->
     <el-table-column prop="date" label="评论内容" align="center">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <!-- 创建日期 -->
      <el-table-column
        prop="description"
        label="创建日期"
        align="center"
        width="140"
      >
        <template slot-scope="scope"
          ><span style="font-size: 10px"
            >{{ scope.row.createDate }}
          </span></template
        >
      </el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="scope"> 
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="headerDeleteMessage(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="page-list">
      
      <el-pagination
      background   
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="limit" 
      :page-sizes="[5, 10, 15, 20]"
      layout=" sizes, prev, pager, next, total, jumper"
      :total="total">
    </el-pagination> 
    </div>
  </div>
</template>

<script>
import { getAllMessage , delOneMessage} from "@/api/message.js"
import { server_URL } from '@/utils/urlConfig.js';
import { formetDate } from "@/utils/formetDate.js";
export default {
  data() {
    return {
      page: 1, // 当前页
      limit: 5, // 页容量
      data: [], // 数据列表
      total: 0, // 数据量
      isLoading: false,
    };
  },
  created() {
    this.getAllMessageList();
  },
  computed:{},
  methods: {
    // 获取数据列表
    getAllMessageList() {
 
      getAllMessage(this.page, this.limit).then(res => {
        console.log("获取评论成功", res.data.rows);
        this.data = res.data.rows;
        this.data.forEach(item => {
          item.avatar1 = server_URL + item.avatar;
          item.createDate = formetDate(item.createDate);
        })
        this.total = res.data.total;
      })
    },
    // headerDeleteMessage 删除单篇文章
    headerDeleteMessage(res) {
      console.log(res);
      this.$confirm(
        `删除【${res.nickname}】留言的内容！, 是否继续?`,
        "危险警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          // 网络请求
          delOneMessage(res.id).then((res) => {
            this.getAllMessageList();
            this.$message({
              type: "success",
              message: "删除成功",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    
    handleSizeChange(res){ 
      this.limit = res; // 每页显示的条数 
      this.getAllMessageList(); 
      console.log("每页显示的条数", res)
    },
    handleCurrentChange(res){ 
      this.page = res; // 当前第几页
      this.getAllMessageList(); 
      console.log("当前第几页", res)

    }
  },
};
</script>

<style>
.page-list{
    text-align: center;
    margin: 20px 0px 30px;
}
</style>
