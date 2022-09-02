<template>
  <div class="app-container">
     <div class="about">
        <p class="title" >关于我</p> 
        <div class="item">
          <span class="sp">关于我的链接:</span> 
          <span class="url">{{ url }}</span>
          <i class="el-icon-edit updataI" @click="updataAbout"></i>
        </div>
     </div>


     <div class="seting">
      <p class="title">全局设置</p>

      <div class="item">
        <span class="sp">头像:</span> 
        <span class="url">{{ form.avatar }}</span>
        <i class="el-icon-edit updataI" @click="updataSetAvatar"></i>
      </div>

      <div class="item">
        <span class="sp">图标:</span> 
        <span class="url">{{ form.favicon }}</span>
        <i class="el-icon-edit updataI" @click="updataSetFavicon"></i>
      </div>

      <div class="item">
        <span class="sp">名称:</span> 
        <span class="url">{{ form.siteTitle }}</span>
        <i class="el-icon-edit updataI" @click="updataSetTitle"></i>
      </div>

      <div class="item">
        <span class="sp">GitHubName:</span> 
        <span class="url">{{ form.githubName }}</span>
        <i class="el-icon-edit updataI" @click="updataSetGithubName"></i>
      </div>

      <div class="item">
        <span class="sp">GitHubUrl:</span> 
        <span class="url">{{ form.github }}</span>
        <i class="el-icon-edit updataI" @click="updataSetGithubUrl"></i>
      </div>

      <div class="item">
        <span class="sp">E-mail:</span> 
        <span class="url">{{ form.mail }}</span>
        <i class="el-icon-edit updataI" @click="updataSetMail"></i>
      </div>
     

      <div class="item">
        <span class="sp">QqName:</span> 
        <span class="url">{{ form.qq }}</span>
        <i class="el-icon-edit updataI" @click="updataSetQqNamem"></i>
      </div>
     
      <div class="item">
        <span class="sp">QqUrl:</span> 
        <span class="url">{{ form.qqQrCode }}</span>
        <i class="el-icon-edit updataI" @click="updataSetQqImg"></i>
      </div>

      <div class="item">
        <span class="sp">WxName:</span> 
        <span class="url">{{ form.weixin }}</span>
        <i class="el-icon-edit updataI" @click="updataSetWxName"></i>
      </div>

      <div class="item">
        <span class="sp">WxUrl:</span> 
        <span class="url">{{ form.weixinQrCode }}</span>
        <i class="el-icon-edit updataI" @click="updataSetWxImg"></i>
      </div>
     </div>
  </div>
</template>

<script>
import { updataAboutUrl , getAboutUrl , getSetting , updateSetting} from "@/api/about.js";
export default {
  data(){
    return {
      form:{},
      url:"",

    }
  },
  created(){
    this.getOneAboutUrl();
    this.getAllSetting();
  },
  methods:{
    // 关于我的链接
    updataAbout(){
      this.$prompt('请输入我的url', '修改提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',  
        }).then(({ value }) => {
          updataAboutUrl(value).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功' 
            });
            this.url = value;
          })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      },
      // 设置头像
      updataSetAvatar(){
        this.$prompt('请输入头像url', '修改提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',  
        }).then(({ value }) => {
          updateSetting({
            "avatar" : value
          }).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功' 
            });
            this.form.avatar = value;
          })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      },
      // 设置图标
      updataSetFavicon(){
        this.$prompt('请输入图标url', '修改提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',  
        }).then(({ value }) => {
          updateSetting({
            "favicon" : value
          }).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功' 
            });
            this.form.favicon = value;
          })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      },
      // 设置githubURL
      updataSetGithubUrl(){
        this.$prompt('请输入Github url', '修改提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',  
        }).then(({ value }) => {
          updateSetting({
            "github" : value
          }).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功' 
            });
            this.form.github = value;
          })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      },
      // 设置githubName
      updataSetGithubName(){
        this.$prompt('请输入Github Name', '修改提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',  
        }).then(({ value }) => {
          updateSetting({
            "githubName" : value
          }).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功' 
            });
            this.form.githubName = value;
          })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      },
      // 设置邮箱
      updataSetMail(){
        this.$prompt('请输入邮箱', '修改提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',  
        }).then(({ value }) => {
          updateSetting({
            "mail" : value
          }).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功' 
            });
            this.form.mail = value;
          })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      },
      // 设置QQ
      updataSetQqNamem(){
        this.$prompt('请输入QQ Name', '修改提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',  
        }).then(({ value }) => {
          updateSetting({
            "qq" : value
          }).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功' 
            });
            this.form.qq = value;
          })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      },
      // 设置qqQrCode
      updataSetQqImg(){
        this.$prompt('请输入QQ Url', '修改提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',  
        }).then(({ value }) => {
          updateSetting({
            "qqQrCode" : value
          }).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功' 
            });
            this.form.qqQrCode = value;
          })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      },
      // 设置 博客名  
      updataSetTitle(){
        this.$prompt('请输入博客名', '修改提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',  
        }).then(({ value }) => {
          updateSetting({
            "siteTitle" : value
          }).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功' 
            });
            this.form.siteTitle = value;
          })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      },
      // 设置 微信
      updataSetWxName(){
        this.$prompt('请输入WX Name', '修改提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',  
        }).then(({ value }) => {
          updateSetting({
            "weixin" : value
          }).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功' 
            });
            this.form.weixin = value;
          })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      },
      // 设置微信img
      updataSetWxImg(){
        this.$prompt('请输入WX Url', '修改提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',  
        }).then(({ value }) => {
          updateSetting({
            "weixinQrCode" : value
          }).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功' 
            });
            this.form.weixinQrCode = value;
          })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      },
      getOneAboutUrl(){
        getAboutUrl().then(res => {
          this.url = res.data;
        })
      },
      getAllSetting(){
        getSetting().then(res => {
          console.log("获取全局设置", res);
          this.form = res.data;
        })
      }
  }
};
</script>

<style scoped>
 
  .title{
    margin: 0px;
    padding-left: 10px;
    font-weight: 600;
    font-family: cursive;
    font-size: 19px;
    user-select: none;
  }
  .sp{
    user-select: none; 
  }
  .about, .seting{
    margin-bottom: 15px;
    color: #6f6f6f; 
    /* height: 50px; */
    /* user-select: none; */
    line-height: 50px; 
    padding: 0px 22px;
    box-shadow: 1px 1px 3px #999;
  }
  .item{ 
    color: #6f6f6f;
    height: 50px;
    line-height: 50px;  
    display: flex;
  }
  .url{
    padding: 0px 10px;
    max-width: 500px; 
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .updataI{
    cursor: pointer; 
    color: #67c23a;
    font-weight: 600; 
    height: 50px; 
    line-height: 50px;
  }
  .updataI:hover{
    color:#85ce61;;
  }
  .about-content{
    width:100%;
    height:100%;
  }
</style>
