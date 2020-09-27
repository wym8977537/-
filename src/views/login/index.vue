<template>
 <div class="login-container">

    <el-form :rules="rules"  ref="form" :model="form" label-width="80px" class="login-form" >
      <h1 class="login-title">会员管理系统</h1>
        <el-form-item label="账号" prop='username'>
            <el-input v-model="form.username" class="login-input"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
            <el-input v-model="form.password" type='password'></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="submitForm('form')"  >提交</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
import {login,getUserInfo} from '@/api/login.js'
export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules:{
          username:[
            {required:true,message:'输入有效账号',trigger:'blur'}
          ],
          password:[
            {required:true,message:'输入有效密码',trigger:'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            //获取提交的信息
            login(this.form.username,this.form.password).then(response => {
              const resp = response.data;
              // console.log(resp)
              //成功获取用户信息
              if(resp.flag){
                getUserInfo(resp.data.token).then(response =>{
                  const respUser = response.data;
                  if(respUser.flag){
                    localStorage.setItem('mms-user',JSON.stringify(respUser.data))
                    // console.log(respUser)
                    localStorage.setItem('mms-token',JSON.stringify(resp.data.token))
                    this.$router.push('/')
                  }else{
                    this.$message({
                    message: resp.message,
                    type:'error'
                })
                  }
                });
              }else{
                this.$message({
                  message:resp.message,
                  type:'error'
                })
              }
            })
          }else{
            this.$message({
              message:'账号不能为空',
              type:'warning'
            });
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-form{
    width:350px;
    margin:250px auto;
    background-color:rgba(255,255,255,0.6);
    padding: 30px;
    border-radius: 20px;
  }
  .login-container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('../../assets/01.jpg');
        background-size: 100%;
    }
    .login-title{
      text-align: center;
        color: #303133;
    }

</style>
