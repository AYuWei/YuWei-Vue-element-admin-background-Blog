<template>
  <div class="app-container">
    <!-- 添加分类 --> 
    <div style="margin-top: 15px">
      <el-input
        placeholder="请输入要分类的内容、左侧为分类等级！"
        v-model="contentValue"
        @keyup.enter.native="addBlogType"
        class="input-with-select inputType"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select> 
      </el-input>
      <el-button type="primary" @click="addBlogType">添加</el-button>
    </div>

    <!-- 分类列表 -->
    <el-table :data="data" style="width: 100%; margin-top: 20px" border v-loading="isLoading">
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="博客分类名" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="description" label="文章数" align="center">
        <template slot-scope="scope"> {{ scope.row.articleCount }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
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
              @click="headerUpdataBanner(scope.row)"
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
              @click="headerDeleteBanner(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑分类 -->
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <!-- 标题 -->
        <el-form-item label="博客分类名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <!-- 描述 -->
        <el-form-item label="分类等级"> 
          <el-select v-model="form.order" placeholder="请选择活动区域">
             <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>

         
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="success" @click="editBlogTypeHander"
          >确 定</el-button
        >
      </div>
    </el-dialog> 
  </div>
</template>

<script>
import { setBlogType, getBlogType, delBlogType, updataOneBlogType} from "@/api/blog.js";
export default {
  data() {
    return {
      contentValue: "", // 分类内容
      select: "1", // 分类等级 
      data: [], // 文字分类内容
      isLoading : false,
      dialogFormVisible: false,
      form:{
        name:"",
        order:""
      }
    };
  },
  created() {
    this.getBlogTypeFetch();
  },
  methods: {
    // 添加分类
    addBlogType() {
      if (!this.contentValue) {
        this.$message.error("数据不可以为空！");
        return;
      } 
      // 请求数据
      this.setBlogTypeFetch();
    },
    // 删除分类
    headerDeleteBanner(res){ 
      this.isLoading = true; 
      delBlogType(res.id).then(res => {  
        this.getBlogTypeFetch();
        this.message("删除成功")
      })
    },
    // 编辑分类
    headerUpdataBanner(res){
      console.log("编辑分类",res);
      this.dialogFormVisible = true;
      this.form = { ...res };

    },
    // 确认编辑分类
    editBlogTypeHander(){
      console.log("确认编辑分类", this.form); 
      this.setUpdataOneBlogType({
        id: this.form.id,
        data:{
            name: this.form.name,
            order: this.form.order
        }
      })
    },
    // 获取分类接口
    getBlogTypeFetch() {
      this.isLoading = true; 
      getBlogType().then((res) => {
        this.data = res.data; 
        this.isLoading = false;
      });
    },
    // 添加分类接口
    setBlogTypeFetch() {
      this.isLoading = true;
      setBlogType({
        name: this.contentValue,
        order: this.gradeValue,
      })
        .then((res) => {
          // 重新获取数据
          this.getBlogTypeFetch();
          this.contentValue = "";
          this.message("添加分类成功")
        })
        .catch((error) => {
          this.$message.error("添加分类失败");
        });
    },
    // updataOneBlogType 修改分类 id
    setUpdataOneBlogType(data){
      this.isLoading = true; 
      updataOneBlogType(data).then(res => {
        // 重新获取数据
        this.getBlogTypeFetch();
        this.message("修改成功");
        this.dialogFormVisible = false; 
      })
    },
    // 弹出框
    message(title = "完成", type = "success"){
      this.$message({
        message: title,
        type: type,
      });
    }
  },
};
</script>

<style>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.inputType {
  width: 400px;
  margin-right: 10px;
}
</style>
