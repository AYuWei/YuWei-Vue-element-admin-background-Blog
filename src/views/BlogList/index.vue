<template>
  <div class="app-container">
    <!-- 文字分类 --> 
    <span class="block">关键字搜索~</span>
    <div class="keyValue">
      <el-input
        placeholder="请输关键字"
        v-model="keyValue"
        @change="ChangeKey"
        clearable>
      </el-input>
    </div>
   

    <el-table
      :data="data"
      style="width: 100%; margin-top: 20px"
      border
      v-loading="isLoading"
    >
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="文章名称" align="center">
        <template slot-scope="scope">  
          <el-popover
            placement="top"  
            trigger="hover" >
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.imgurl"
              v-if="scope.row.imgurl"
              fit="cover">
            </el-image>
            <span v-else >无主图</span>
            <span  slot="reference">{{ scope.row.title }}</span>
          </el-popover> 
        </template>
      </el-table-column>
      <el-table-column prop="description" label="文章描述" align="center">
        <template slot-scope="scope"> {{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="浏览量"
        align="center"
        width="80"
      >
        <template slot-scope="scope"> {{ scope.row.scanNumber }}</template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="评论量"
        align="center"
        width="80"
      >
        <template slot-scope="scope"> {{ scope.row.commentNumber }}</template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="分类"
        align="center"
        width="140"
      >
        <template slot-scope="scope">
          {{ scope.row.category ? scope.row.category.name : "" }}</template
        >
      </el-table-column>
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
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="success"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="headerUpdataBlog(scope.row)"
            ></el-button>
          </el-tooltip>
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
              @click="headerDeleteBlog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>


    
    <!-- 分页 -->
    <div class="page-list">
      <div class="page-list-left">
        <el-pagination
          background   
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="limit" 
          :page-sizes="[5, 10, 15, 20]"
          layout="sizes, prev, pager, next, total, jumper"
          :total="total"> 
        </el-pagination> 
      </div>   
    </div>
  </div>
</template>

<script>
import { getPageBlog, delOneBlog, getBlogType } from "@/api/blog.js";
import { formetDate } from "@/utils/formetDate.js";
import { server_URL } from '@/utils/urlConfig.js';
import "@toast-ui/editor/dist/i18n/zh-cn.js";
export default {
  data() {
    return {
      page: 1, // 当前页
      limit: 5, // 页容量 
      keyValue:"",//查询关键字 
      data: [], // 数据列表
      blogType:[], // 博客分类 
      restaurants : [],
      total: 0, // 数据量
      isLoading: false,
    };
  },
  created() {
    this.getBlogList();
    this.getBlogTypeFetch();
  },
  computed:{},
  methods: {
    getBlogTypeFetch(){
      getBlogType().then(res => {
         console.log("获取文章分类",res)
         this.blogType = [ 
          { 
            id: "-1",
            name: "不分类", 
          },
          ...res.data
         ]
      })
    },
    // 获取数据列表
    getBlogList() {  
      getPageBlog(this.page, this.limit, this.keyValue, this.keyId).then((res) => {
        this.total = res.data.total;
        console.log("total", res.data.total)
        this.data = res.data.rows;
        this.data.forEach((item) => {
          item.createDate = formetDate(item.createDate);
          item.imgurl = item.thumb ? server_URL + item.thumb : "";
        });
        console.log(this.data);
      });
    },
    // headerDeleteBlog 删除单篇文章
    headerDeleteBlog(res) {
      console.log(res);
      this.$confirm(
        `即将永久删除【${res.title}】文章！, 是否继续?`,
        "危险警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          // 网络请求
          delOneBlog(res.id).then((res) => {
            this.getBlogList();
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
    // headerUpdataBlog 修改文章
    headerUpdataBlog(res) { 
      this.$router.push(`/blogEditor/${res.id}`);
    }, 
    handleSizeChange(res){ 
      this.limit = res; // 每页显示的条数 
      this.getBlogList(); 
    },
    // currentPage 改变时会触发
    handleCurrentChange(res){ 
      this.page = res; // 当前第几页
      this.getBlogList(); 
    }, 
    // 关键字所搜 
    ChangeKey(res){
      this.keyValue = res; 
      this.getBlogList();
    }
  },
};
</script>

<style >
.page-list{
    text-align: center; 
    margin: 20px 0px 30px;
}
.block{
  color: #898686;
    font-weight: 600;
    padding: 0px 10px;
}
.keyValue{
  display: inline-block;
}
</style>
