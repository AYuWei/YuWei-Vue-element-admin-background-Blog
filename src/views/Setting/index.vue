<template>
  <div class="app-container">
    <div class="setting-container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="管理员名称" prop="name">
          <el-input v-model="ruleForm.name" ></el-input>
        </el-form-item>

        <el-form-item label="账号ID" prop="id">
          <el-input  v-model="ruleForm.id" ></el-input>
        </el-form-item>

        <el-form-item label="旧密码" prop="passOld">
          <el-input type="password" show-password v-model="ruleForm.passOld" ></el-input>
        </el-form-item>

        <el-form-item label="新密码"  prop="passNew">
          <el-input type="password" show-password  v-model="ruleForm.passNew" ></el-input>
        </el-form-item> 

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="isLoading">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { settingAdmin } from "@/api/setting.js";
export default {
  data() {
    // 设置新密码
      var ChangePassNew = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入新密码'));
        }
        setTimeout(() => {
          if (value.length < 6) {
              callback(new Error('密码必须大于6位'));
            } else {
              callback();
            }
        }, 1000);
      };

      var ChangePassOld = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入旧密码'));
        } 
      };

      var ChangeId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入管理员ID'));
        } 
      };

      var ChangeName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入管理员名称'));
        } 
      };
      
      
     
      return {
        isLoading:false,
        ruleForm: {
          name: this.$store.state.user.user.name,
          id: this.$store.state.user.user.loginId,
          passOld: '',
          passNew: ''
        },
        rules: {
          name: [
            { validator: ChangeName, trigger: 'blur' }
          ],
          id: [
            { validator: ChangeId, trigger: 'blur' }
          ],
          passOld: [
            { validator: ChangePassOld, trigger: 'blur' }
          ],
          passNew: [
            { validator: ChangePassNew, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) { 
        this.isLoading = true;
        if(this.ruleForm.name && this.ruleForm.id && this.ruleForm.passOld && this.ruleForm.passNew){
          settingAdmin({
              name: this.ruleForm.name ,
              loginId: this.ruleForm.id,
              loginPwd: this.ruleForm.passNew,
              oldLoginPwd: this.ruleForm.passOld
          }).then(res => {
            if( typeof(res) == "string" ){ 
              this.$message({
                type: "error",
                message: JSON.parse( res ).msg,
              }); 
              this.ruleForm.passOld = "";
              this.ruleForm.passNew = "";
              this.isLoading = false;
            }else{
              console.log(res);
              this.$message({
                type: "success",
                message: "修改成功",
              }); 
              this.isLoading = false;  
              this.$refs[formName].resetFields();
              this.$router.push("/login");
            }
          })
        }
        this.$refs[formName].validate((valid) => {});
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style lang="scss" scoped>
.setting-container{
  width:400px;  
  margin: 30px auto;
}
</style> 
