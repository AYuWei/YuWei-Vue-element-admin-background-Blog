<template>
  <div class="app-container">
    <div class="setting-container">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="管理员名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入管理员名称"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="id">
        <el-input v-model="ruleForm.id" placeholder="请输入管理员登录账号"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass"  placeholder="请输入旧密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="checkPass">
        <el-input type="password" show-password v-model="ruleForm.checkPass" placeholder="请输入新密码" autocomplete="off"></el-input>
      </el-form-item>
     
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入管理员名称'));
        } 
      };
      var checkId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        } 
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          name: this.name = this.$store.state.user.user.name,
          id : ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          id: [
            { validator: checkId, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    }, 
    methods: {
      submitForm(formName) { 
        this.$refs[formName].validate((valid) => { 
          if (valid) {   
            alert('submit!'); 
          } else {
            console.log('error submit!!');
            return false;
          } 
        });
        // if( this.ruleForm.name !="" && this.ruleForm.pass !="" && this.ruleForm.id !="" && this.ruleForm.checkPass !="" ){
          // settingAdmin({
          //   name:this.ruleForm.name,
          //   loginId:this.ruleForm.id,
          //   loginPwd:this.ruleForm.checkPass,
          //   oldLoginPwd:this.ruleForm.pass,
          // }).then(res => {
          //   console.log("修改成功", res)
          // })
        // } 
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
