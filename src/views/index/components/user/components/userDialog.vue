<template>
  <div>
    <el-dialog center width="33%" :title="isAdd?'新增用户':'编辑用户'" :visible.sync="dialogFormVisible">
      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="userForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
          <el-select @change="userForm.role_id = userForm.role" v-model="userForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-select @change="userForm.status = userForm.statusVal" v-model="userForm.statusVal" placeholder="请选择状态">
            <!-- 用于解决状态显示数字的问题 -->
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="userForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancle">取 消</el-button>
        <el-button type="primary" @click="dialogAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入及入口文件
import { userAdd,userEdit } from "@/api/user.js";

export default {
  data() {
    return {
      // 对话框默认隐藏
      dialogFormVisible: false,
      // 表单文字宽度
      formLabelWidth: "100px",
      // 表单的数据
      userForm: {},
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "电话不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "目前只支持中国大陆手机号"
          }
        ],
        role_id: [{ required: true, message: "角色不能为空", trigger: "blur" }]
      },
      // 共用一个对话框的判断条件，默认为true显示新增
      isAdd: true,
    };
  },
  methods: {
    // 对话框的确认按钮点击事件
    dialogAdd() {
      // 先做表单的验证
      this.$refs.userForm.validate(valid => {
        if (valid) {
          // 判断，如果isAdd为true就做新增的请求，否则就做编辑的逻辑
          if (this.isAdd) {
            // 代表全部验证成功  发送添加用户的请求
            userAdd(this.userForm).then(res => {
              // console.log(res);
              // 判断
              if (res.data.code == 200) {
                this.$message.success("用户新增成功");
                // 关闭对话框
                this.dialogFormVisible = false;
                // 重新请求数据
                this.$parent.getDataList();
                // 新增成功后把对话框清空
                this.$refs.userForm.resetFields();
              } else {
                this.$message.error("新增失败，" + res.data.message);
              }
            });
          } else {
            // 编辑的请求
            userEdit(this.userForm).then(res=>{
              // console.log(res);
              // 判断
              if(res.data.code === 200){
                this.$message.success('用户编辑成功');
                // 重新请求数据
                this.$parent.getDataList()
                // 关闭对话框
                this.dialogFormVisible = false;
              }else{
                // 错误的消息提示
                this.$message.error('用户编辑失败，'+res.data.message);
              }
            })
          }
        }
      });
    },
    // 对话框取消的点击事件
    dialogCancle() {
      // 让对话框隐藏并清空表单
      this.dialogFormVisible = false;
      this.$refs.userForm.resetFields();
    }
  }
};
</script>

<style>
</style>