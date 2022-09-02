<template>
  <div class="app-container">
    <!-- 文章标题 -->
    <p class="block">文章标题</p>
    <el-input  v-model="font.title" placeholder="请输入内容"></el-input>

    <!-- 文章编辑 -->
    <p class="block">文章编辑</p>
    <Editor height="600px" ref="editorRef" :initialValue="font.editorText"/>

     <!-- 文章描述 -->
    <p class="block">文章描述</p>
    <el-input type="textarea"  v-model="font.description" placeholder="请输入内容"></el-input>
    
    <!-- 文章头图 -->
    <p class="block">文章头图</p>
    <div class="blog-img">
      <UpLoad v-model="font.thumb"/>
    </div> 

     <!-- 文字分类 -->
    <p class="block">文字分类</p>
    <el-select v-model="font.select" slot="prepend" @change="change" placeholder="请选择文章分类">
          <el-option v-for="item in blogType" :key="item.id" :label="item.name" :value="item.id"></el-option> 
    </el-select>  

    <!-- 修改文章 -->
    <div class="add-black" style="margin-top:15px; margin-bottom:30px;">
      <el-button type="primary" @click="updataBlogHendle">修改文章</el-button>
    </div>
    
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'; 
import { Editor } from '@toast-ui/vue-editor';
import UpLoad from "@/components/Upload/index.vue"
import { getBlogType , getOneBlog , updataBlog} from "@/api/blog.js" 
import "@toast-ui/editor/dist/i18n/zh-cn.js";
export default {
  data(){
    return {
      font:{
        title : "",  // 文章标题
        editorText : "", // 文章内容
        description : "", // 表述
        thumb : "", // 图片
        select:""
      },
      blogType:[],
      blogId : "" // 文章id
    }
  },
  components : {
    Editor,
    UpLoad
  },
  created(){ 
    this.blogId = this.$route.params.id;
    this.getBlogTypeFetch();
    this.getOneBlogFetch(); 
  },
  methods:{
    // 获取分类
    getBlogTypeFetch(){
      getBlogType().then(res => { 
         this.blogType = res.data;
      })
    },
    // 获取单篇文章
    getOneBlogFetch(){
      getOneBlog(this.blogId).then(res => {
        console.log("获取单篇文章", res)
        this.font = {...res.data}
        // 设置编辑内容
        this.$refs.editorRef.invoke('setHTML', res.data.htmlContent);
        // 设置分类
        this.font.select = res.data.category === null ? "" : res.data.category.id;
      })
    },
    // updataBlogHendle 修改文章
    updataBlogHendle(){ 
      console.log(this.font)
      // 获取markDown文本内容
      let html = this.$refs.editorRef.invoke("getHTML") ;
      let markdown = this.$refs.editorRef.invoke("getMarkdown") ;
      
      let obj = {
        "title": this.font.title,
        "description": this.font.description,
        "createDate": new Date().getTime(),
        "categoryId": this.font.select,
        "htmlContent": html,
        "thumb": this.font.thumb,
        "markdownContent": markdown
      } 
      // 对象组装好以后，就提交给服务器
      if(obj.title && obj.description && obj.htmlContent && obj.categoryId){
        updataBlog({
          id: this.blogId,
          data: obj
        }).then((res)=>{
          console.log("修改完成",res);
           this.$message({
              message: `成功修改 ${res.data.title} 的文章！`,
              type: "success",
            });
          this.$router.push('/blogList'); // 跳转到文章列表
        })
      } else {
          this.$message.error('请填写所有内容');
      } 
    },
     change() {
      // 强制刷新
      this.$forceUpdate();
    },
  }
}
</script>

<style  scoped>
.block{
    color: #999;
    font-family: serif;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
}
.blog-img{
  width:180px; 
}
</style> 
 