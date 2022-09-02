<template>
  <div class="app-container">
<el-form :model="form">
        <!-- 标题 -->
        <el-form-item label="项目标题">
          <el-input v-model="form.title"></el-input>
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

        <!-- github链接 -->
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
        <el-button type="success" @click="editProject">添加项目</el-button>
      </div> 
  </div>
</template>

<script>
import {  AddOneProject } from "@/api/project.js";
import Upload from "@/components/Upload/index.vue"; 

export default {
  data() {
    return { 
      data: [], // 存储数据 
      imgUrl:"", 
      isLoading: false,
      // 弹出框数据内容
      form: {
        id: "",
        title: "",
        url: "",
        github: "",
        thumb:"",
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
  methods: {  
    // 点击添加
    editProject(){ 
        this.addProject();
    },
     // 添加数据
    addProject() { 
      let arr = [this.form.description1,this.form.description2,this.form.description3];
      let ObjArr = [];
      arr.forEach(item => { 
        if(item != '') ObjArr.push(item);
      })
      let obj = {
        "description":ObjArr, // 项目描述段落
        "name": this.form.title, // 项目名称
        "url": this.form.url, // 项目效果请求地址
        "github": this.form.github, // 项目github地址
        "thumb": this.form.thumb, // 缩略图，项目截图
        "order": +this.form.order// 排序
      }  

       // 对象组装好以后，就提交给服务器
      if(obj.name && obj.url && obj.thumb && obj.order){
       this.AddOneProjectFetch(obj); // 添加项目
      } else {
          this.$message.error('请填写所有内容');
      }  
    },
    // 添加一个项目
    AddOneProjectFetch(data){
      console.log(data) 
      AddOneProject(data).then(res => {
        console.log(res);
        if(res.code === 0){
          this.dialogFormVisible = false; // 编辑对话框  
          this.$message({
            type: "success",
            message: "添加成功!",
          }); 
          setTimeout(()=>{
            this.$router.push("/projectlist");
          },300)
        }
      })
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
