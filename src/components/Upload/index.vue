<template>
  <div class="upload-container">
    <!-- 上传组件标题 -->
    <div v-if="uploadTitle" class="block">{{ uploadTitle }}</div>
    <!-- 上传控件 
    :on-progress="handleProgress"
      :on-error="handleError"
    -->
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"  
      :headers="headers"
      v-loading="isLoading" 
    >
      <img v-if="value" :src="imageUrlone" class="avatar"  />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { server_URL } from '@/utils/urlConfig.js'
export default {
  props: ["uploadTitle", "value"],
  data(){
    return{
       isLoading : false,
    }
  }, 
  computed : { 
    imageUrlone(){
      console.log("url", this.value)
     if(this.value){
       return server_URL + this.value;
     }
    },
    headers(){
        return {
            Authorization : 'Bearer ' + localStorage.getItem('adminToken'), // 从本地获取 token，添加到 header 里面
        }
    }
  }, 
  methods: {
      // 文件上传成功时的钩子
      handleAvatarSuccess(res, file){
          if(!res.code && res.data){ 
            this.imageUrl = server_URL + res.data;
              // 说明上传成功，服务器给我们返回了图片上传后的服务器地址
              this.$emit('input', res.data); 
              this.isLoading = false; 
          }
      },
      // 文件上传时的钩子
      handleProgress(res, file){ 
        this.isLoading = true; 
      },
      // 文件上传失败时的钩子
      // handleError(res, file){
      //   console.log("文件上传失败时的钩子", res, file)
      // },
  },
};
</script>

<style lang="scss" scoped> 
.el-form-item{
      text-align: center;
    border: 1px solid;
}
.avatar-uploader{
      text-align: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed red;
    // border: 1px dashed #d9d9d9;
    border-radius: 6px;
     margin-top: 35px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    
  border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  } 


  .upload-container{
    position: relative; 
    .block{
      height:30px;
      margin: 0px;
      padding: 0px;
      line-height: 15px;
      font-weight: 600;
      text-align: center; 
    }
  }
  img{
        object-fit: cover;
    margin: auto;
  }
</style>