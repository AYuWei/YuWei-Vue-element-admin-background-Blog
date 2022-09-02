<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table
      :data="data"
      style="width: 100%; margin-top: 20px"
      border
      v-loading="isLoading"
    >
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="description" label="项目描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.description.toString() }}</template
        >
      </el-table-column>
      <el-table-column
        prop="description"
        label="预览图"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 120px; height: 120px"
            :src="scope.row.thumb1"
            fit="cover"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="github"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="info"
              icon="iconfont icon-github"
              circle
              size="mini"
              @click="headerGoGithub(scope.row)"
            ></el-button>
          </el-tooltip>
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
              @click="headerUpdataProject(scope.row)"
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
              @click="headerDeleteProject(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- 无数据线是 -->
      <div slot="empty">
        <div class="empty">
          <div class="empty-container" @click="headerAddBanner">
            <i class="el-icon-plus"></i>
            <p class="el-title">无数据、点击上传</p>
          </div>
        </div>
      </div>
    </el-table>
   

    <!-- 编辑修改项目 -->
    <el-dialog title="修改项目" :visible.sync="dialogFormVisible" top="5vh" fullscreen >
      <el-form :model="form">
        <!-- 标题 -->
        <el-form-item label="项目标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <!-- 描述 -->
        <el-form-item label="项目描述（选填）">
          <el-input
            placeholder="请输入描述一"
            class="description"
            v-model="form.description1"
          ></el-input>
          <el-input
            placeholder="请输入描述二"
            class="description"
            v-model="form.description2"
          ></el-input>
          <el-input
            placeholder="请输入描述三"
            class="description"
            v-model="form.description3"
          ></el-input>
        </el-form-item>

        <!-- 项目链接 -->
        <el-form-item label="项目链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>

        <!-- githuburl链接 -->
        <el-form-item label="GitHub地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>

        <!-- 预览图地址 -->
        <!-- 预览图 -->
        <el-form-item label="预览图" style="width: 180px;">
              <Upload v-model="form.thumb" />
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
        <el-button @click="dialogFormVisible = false">取消编辑</el-button>
        <el-button type="success" @click="editUpdataProject">修改项目</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllProject , updataOneProject , delOneProject } from "@/api/project.js";
// 引入封装好的上传图片组件
import Upload from "@/components/Upload/index.vue"; 
import { server_URL } from '@/utils/urlConfig.js'

export default {
  data() {
    return {
     
      data: [], // 存储数据
      imgUrl:"",
      active: "add", // 当前的状态 add 添加数据 updata更改数据
      dialogFormVisible: false, // 编辑对话框是否显示 
      isLoading: false,
      // 弹出框数据内容
      form: {
        id: "",
        title: "",
        url: "",
        githuburl: "",
        thoumurl:"",
        description1: "",
        description2: "",
        description3: "",
        order:1
      },
    };
  },
  components: {
    Upload, 
},
  created() {
    this.getAllProjectFetch();
  },
  
  methods: {  
    // 修改项目
    editUpdataProject(res){ 
        // 更改数据
        console.log("点击更改数据", this.form)
        let arr = [this.form.description1,this.form.description2,this.form.description3];
        let ObjArr = [];
        arr.forEach(item => { 
          if(item != undefined) ObjArr.push(item);
        })
        // 处理修改数据
        let obj = {
          description:ObjArr,
          github: this.form.github,
          id: this.form.id,
          name: this.form.name,
          order: +this.form.order,
          thumb: this.form.thumb,
          url: this.form.url,
        }  
        console.log(this.form.id)
        updataOneProject({
          id:this.form.id,
          data:obj
        }).then(res => {
          this.getAllProjectFetch();
          this.$message({
            type: 'success',
            message: '修改成功!'
          });  
        })
    }, 
     
    // 获取所有的项目
    getAllProjectFetch(){
      getAllProject().then(res => {  
        this.dialogFormVisible = false;
        this.data =  res.data;
        this.data.forEach(item => {
          item.thumb1 = server_URL + item.thumb
        })
        console.log("数据库", this.data)
      })
    },
    headerGoGithub(res){
      window.open(res.github); 
    },
    // headerUpdataProject 编辑按钮
    headerUpdataProject(res){
      console.log("编辑", res)
      this.dialogFormVisible = true;
      this.form = {
        ...res,
        description1 : res.description[0],
        description2 : res.description[1],
        description3 : res.description[2],
      };
      console.log("回填",this.form);
    }, 
    // headerAddBanner 无数据添加数据
    headerAddBanner() {
      this.$router.push("/projectadd");
    },
     
    // headerDeleteProject 删除数据
    headerDeleteProject(dataValue) {
      console.log("删除", dataValue);
      this.$confirm(`此操作将永久删除该【${dataValue.name}】项目, 是否继续?`, '危险警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(dataValue.id)
           delOneProject(dataValue.id).then(res => {
            if(res.code == 0){
               this.$message({
                  type: 'success',
                  message: '删除成功!'
                }); 
                this.getAllProjectFetch();
            }
           }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },  
  },
};
</script>

<style lang="scss" scoped>
.empty-container {
  border: 1px solid rgb(140, 140, 140);
  border-style: dashed;
  width: 130px;
  height: 130px;
  margin: 20px;
  position: relative;
  margin-left: calc(50% - 65px);

  cursor: pointer;
}
.el-icon-plus {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -27px;
  margin-left: -15px;
  font-size: 30px;
  color: #999;
}
.el-title {
  top: 50%;
  position: absolute;
  width: 130px;
  font-weight: 600;
  height: 50px;
  text-align: center;
  padding: 0px;
  line-height: 50px;
  margin-top: -3px;
  font-size: 13px;
  color: #999;
}

.add-banner {
  bottom: 50px;
  right: 30px;
  text-align: center;
  padding: 22px;
  &button {
    box-shadow: 0px 0px 5px #727171;
  }
}
.description {
  margin: 5px 0px;
}
.el-select .el-input {
  width: 130px;
} 
.el-input-c{
  width:100px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
// text-align: center;
.dialog-footer{
  text-align: center;
}
</style>
