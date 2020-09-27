<template>
  <div class="header">
    <a href="">
          <img src="@/assets/02.jpg" class="logo">
          <span class="company">会员管理系统</span>
    </a>
     <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        更改
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a" icon='el-icon-user'>修改密码</el-dropdown-item>
        <el-dropdown-item command="b" icon="el-icon-warning-outline">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import {logout} from '@/api/login'
export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    handleCommand(command) {
      switch (command) {
        case 'a':
          this.$message("click on item " + command);
          break;
        case 'b':
          logout(
            localStorage.getItem(localStorage.getItem('mms-token')))
          .then(response => {
             const resp = response.data;
             if(resp.flag){
              localStorage.removeItem('mms-user');
              localStorage.removeItem('mms-token');
              this.$router.push("/login");
             }else{
               this.$notify.arror({
                 title:'错误',
                 message:'退出失败'
               })
             }
          })
          break;
        default:
          break;
      }
      
    }
  }
};
</script>

<style scoped>
.logo{
    vertical-align: middle;
    padding: 0 10px 0 40px;
    width: 40px;
    height: 40px;
}
.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: white;
}
.company {
  position: absolute;
  color: white;
}
</style>