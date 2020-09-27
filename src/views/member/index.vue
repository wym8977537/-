<template>
  <div>
    <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top: 20px;">
    <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号" style="width: 200px;"></el-input>
    </el-form-item>
    <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名称" style="width: 200px;"></el-input>
    </el-form-item>
    <el-form-item prop="payType">
        <el-select v-model = "searchMap.payType" placeholder = "支付类型" style="width: 110px">
            <el-option v-for = "option in payTypeOptions" :key = "option.type" :label = "option.name" :value = "option.type" />
        </el-select>
    </el-form-item>
    <el-form-item prop="birthday">
        <el-date-picker value-format = "yyyy-MM-dd" v-model = "searchMap.birthday" type = "date" placeholder = "出生日期"></el-date-picker>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click = "fetchData">查询</el-button>
        <el-button  icon="el-icon-search" @click = "handleAdd">新增</el-button>
         <el-button @click="resetForm('searchForm')">重置</el-button>
    </el-form-item>
</el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名"> </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="integral" label="可用积分"> </el-table-column>
      <el-table-column prop="money" label="开卡金额"> </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>{{ scope.row.payType | payTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px">
    <!-- status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
    <el-form status-icon ref="pojoForm" :model="pojo" label-width="100px" label-position="right" style="width: 400px;" :rules = "rules">
        <el-form-item label="会员卡号" prop="cardNum">
            <el-input v-model="pojo.cardNum" />
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
            <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
            <el-date-picker v-model="pojo.birthday" type="date" placeholder="请点击选择" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
            <el-input v-model="pojo.phone" />
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
            <el-input v-model="pojo.money" />
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
            <el-input v-model="pojo.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
            <el-select v-model="pojo.payType" class="filter-item" placeholder="请点击选择">
                <el-option v-for="option in payTypeOptions" :key="option.type" :label="option.name"
                    :value="option.type" />
            </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
            <el-input v-model="pojo.address" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入地址" />
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="resetForm('pojoForm')">重置</el-button>
        <el-button type="primary" @click="addData('pojoForm')">确 定</el-button>
    </div>
</el-dialog>
  </div>
</template>

<script>
import memberApi from "@/api/member";
//过滤器
const payTypeOptions = [
  { type: "1", name: "现金" },
  { type: "2", name: "微信" },
  { type: "3", name: "支付宝" },
  { type: "4", name: "银行卡" }
];
export default {
  data() {
    return {
      list: [],
      total: 0, //总页数
      currentPage: 1, //第几页
      pageSize: 10, //每页几条
      searchMap: {
            cardNum: '',
            name: '',
            payType: '',
            birthday: ''
      },
      payTypeOptions, 
      //弹窗内容添加
      pojo:{
          cardNum:'',
          name:'',
          birthday:'',
          phone:'',
          money:'',
          integral:'',
          payType:'',
          address:''
      },
      //规定星标必填
      rules:{
          cardNum:[{required:true , message:'卡号不能为空' , trigger:"blur"}],
          name:[{required:true,message:"姓名不能为空" , trigger:'blur'}],
          payType:[{required:true,message:"选择支付类型" , trigger:'blur'}]
      },
      dialogFormVisible:false
    };
  },
  created() {
    this.fetchData();
  },
  components: {},
  filters: {
    payTypeFilter(type) {
      const item = payTypeOptions.find(item => item.type === type);
      return item ? item.name : null;
    }
  },
  methods: {
    //   点击添加弹窗
      handleAdd(){
        this.dialogFormVisible = true
        this.$nextTick(() => {
        this.$refs['pojoForm'].resetFields()
        })
    } ,
    //添加是否成功
      addData(formName) {
        this.$refs[formName].validate(valid => {
        if (valid) {
          //通过，提交添加
          memberApi.add(this.pojo).then(response => {
            const resp = response.data
            if(resp.flag){
              //刷新数据
              this.fetchData()
              //关闭窗口
              this.dialogFormVisible = false
            }else{
              //失败，弹窗
              this.$message({
                message:resp.message,
                type:'warning'
              })
            }
          })
        } else {
            // 验证不通过
            return false;
        }
        })
    },
    // 点击重置
    resetForm(formName) {
	this.$refs[formName].resetFields();
    },

    //改变整页信息
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    // 编辑
    handleEdit(id) {
      console.log(id);
    },
    handleDelete(id) {
      console.log(id);
    },
    fetchData() {
      //   memberApi.getList().then(response => {
      //     this.list = response.data.data;
      //     //  console.log(this.list)
      //
      //调用api中的search方法，想要那也传过去，然后获取这页的内容发送到页面
      memberApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          const reqs = response.data;
          // console.log(reqs);
          this.total = reqs.data.total;
          this.list = reqs.data.rows;
          // console.log(this.total, this.list);
        });
    }
  }
};
</script>

<style scoped>
</style>