<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题"  align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center">
        <template slot-scope="scope"> {{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="中图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="getServerUrl(scope.row.midImg)"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="getServerUrl(scope.row.bigImg)"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
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
      <!-- 无数据线是 -->
      <div slot="empty">
         <div class="empty">
            <div class="empty-container"  @click="headerAddBanner" >
              <i class="el-icon-plus"></i>
              <p class="el-title">无数据、点击上传</p> 
            </div>
         </div>
      </div>
     
    </el-table>

    <!-- 有数据的时候上传数据 -->
  <div class="add-banner" v-if="data.length"> 
      <el-button type="primary" icon="el-icon-plus" circle @click="headerAddBanner"></el-button>
  </div>
  
    <!-- 编辑首页标语 -->
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <!-- 标题 -->
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <!-- 描述 -->
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item> 
                <!-- 中图 -->
                <Upload v-model="form.midImg" uploadTitle="标语中图"/> 
            </el-form-item>
          </el-col> 
          <el-col :span="12"> 
                <!-- 大图 -->
                <Upload v-model="form.bigImg" uploadTitle="标语大图"/> 
          </el-col> 
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="success" @click="editBannerConfirm"
          >确 定</el-button
        >
      </div>
    </el-dialog> 

   

  </div>
</template>


<script>
import { getBanner, setBanner } from "@/api/banner.js";
import { server_URL } from '@/utils/urlConfig.js'
// 引入封装好的上传图片组件
import Upload from "@/components/Upload/index.vue";

export default {
  data() {
    return {
      data: [], // 存储数据
      active:"add", // 当前的状态 add 添加数据 updata更改数据
      dialogFormVisible: false, // 编辑对话框是否显示  
      centerDialogVisible: false, // 删除对话框
      // 弹出框数据内容
      form: {
        id: "",
        midImg: "",
        bigImg: "",
        title: "",
        description: "",
      },
    };
  },
  components: {
    Upload,
  }, 
  created(){
      this.getAllBanner();
  },
  computed:{
    
  },
  methods: {
    // url拼接
    getServerUrl(url){
      return server_URL + url;
    },
    // 获取首页标语
    getAllBanner(){
      getBanner().then(res => {
        console.log("获取首页标语成功", res)
        this.data = res.data;
        
      })
    },
    // headerAddBanner 无数据添加数据
    headerAddBanner(){
      this.active = "add"; // 当前操作的类型
      this.dialogFormVisible = true; // 编辑对话框
      this.form = {
        id: "",
        midImg: "",
        bigImg: "",
        title: "",
        description: "",
      }
    },
    // headerUpdataBanner 更改数据
    headerUpdataBanner(dataValue){
      this.active = "updata"; // 当前操作的类型
      this.dialogFormVisible = true; // 编辑对话框
      console.log(dataValue)
      this.form = { ...dataValue }
    },
    // headerDeleteBanner 删除数据
    headerDeleteBanner(dataValue){
      console.log("删除", dataValue)
      this.$confirm(`此操作将永久删除该【${dataValue.title}】, 是否继续?`, '危险警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("删除的")
          this.data = this.data.filter((item, i) => {
            return item.id != dataValue.id;
          }); 
          // 网络请求 
          this.asyncBanner(this.data, ()=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
          
        }).catch(() => { 
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // editBannerConfirm 编辑确认
    editBannerConfirm(){
       if(this.active === "add"){
        // 添加数据
        this.addBanner();
       } else if(this.active === "updata"){
        // 更改数据
        this.updataBanner();
       }
    },
    // 添加数据
    addBanner(){
      console.log("添加数据");
      let arr = [...this.data, this.form];
      // 网络请求 
      this.asyncBanner(arr);
    },
    // 更改数据
    updataBanner(){
      console.log("更改数据", this.form); 
      // 这里的修改是将全部数据一起返回修改的
      let arr = this.data;
      for(let i = 0 ; i < arr.length ; i ++){
        if( arr[i].id === this.form.id ){
          arr[i] = this.form;
        }
      } 
      // 网络请求
      this.asyncBanner(arr);
    },
    asyncBanner(arr, callback = null){
      setBanner(arr).then(res =>{
        console.log("成功", res);
          this.dialogFormVisible = false; // 编辑对话框
          this.getAllBanner();
          if(this.active === "add"){
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          } else if (this.active === "updata"){
            this.$message({
              type: 'success',
              message: '更新成功!'
            });
          }
          if(callback){
            callback();
          }
      })
    },
    // 编辑
    editBannerHandle(){
       // 1. 将 data 的数据给 form 2. 打开 dialog
      this.form = { ...this.data }; 
      this.dialogFormVisible = true;
    },
    // 确定修改
    editFetch(){
      // this.dialogFormVisible = false;
      let arr = [...this.data];
      if(arr.length){ 
        for(var i=0;i<arr.length;i++){
          if(arr[i].id == this.form.id){
            arr[i] = this.form
          }
        }
      } else {
        arr.push({
          midImg : server_URL + this.form.midImg,
          bigImg : server_URL + this.form.bigImg,
          title : this.form.title,
          description : this.form.description, 
        })
      }
      setBanner(arr).then(res =>{
        console.log("成功", res)
      })
      console.log("确认了哦", this.form)
    },   
  },
};
</script>

<style lang="scss" scoped>

.empty-container{
    border: 1px solid rgb(140, 140, 140);
    border-style: dashed;
    width: 130px;
    height: 130px;
    margin: 20px;
    position:relative; 
    margin-left: calc(50% - 65px);
    
    cursor: pointer;
}
.el-icon-plus{
    position:absolute;
    top:50%;
    left:50%;
    margin-top:-27px;
    margin-left:-15px;
    font-size: 30px;
    color:#999;
    
} 
.el-title{
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
 
.add-banner{
  bottom: 50px;
  right: 30px; 
  text-align: center;
  padding: 22px;
  &button{
      box-shadow: 0px 0px 5px #727171;
  }
}
</style>