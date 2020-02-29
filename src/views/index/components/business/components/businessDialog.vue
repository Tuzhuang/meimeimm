<template>
  <div>
    <el-dialog center width="40%" :title="isAdd?'新增企业':'编辑企业'" :visible.sync="dialogFormVisible">
      <el-form ref="dialogForm" :model="form" :rules="rules">
        <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
          <el-input v-model="form.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancle">取 消</el-button>
        <el-button type="primary" @click="busiDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入新增企业的接口
import { businessAdd,businessEdit } from "@/api/business.js";

export default {
  data() {
    return {
      // 对话框默认隐藏
      dialogFormVisible: false,
      // 对话框文本的宽度
      formLabelWidth: "100px",
      // 对话框的数据
      form: {},
      // 规则验证
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", triggrt: "blur" }],
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "企业简介不能为空", trigger: "blur" }
        ]
      },
      // 判断当前的是新增还是编辑，默认是新增 整合到一个文件内
      isAdd: true
    };
  },
  methods: {
    // 新增对话框的确认按钮点击事件
    busiDialog() {
      // 先验证规则通过之后再发送请求
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          // 判断如果当前是新增的话就调用新增的接口
          if (this.isAdd) {
            // 发送请求  可以直接传入对象
            businessAdd(this.form).then(res => {
              // console.log(res);
              // 判断
              if (res.data.code === 200) {
                // 消息提示
                this.$message.success("企业新增成功");
                // 隐藏对话框
                this.dialogFormVisible = false;
                // 重新请求数据
                this.$parent.getDataList();
                // 新增成功之后要重置表单
                this.$refs.dialogForm.resetFields();
              } else {
                this.$message.error("新增失败，" + res.data.message);
              }
            });
          } else {
            // 否则就调用编辑的接口
            // 发送请求  可以直接传入对象
            businessEdit(this.form).then(res => {
              //   console.log(res)
              // 判断
              if (res.data.code === 200) {
                // 消息提示
                this.$message.success("编辑成功");
                // 重新请求数据
                this.$parent.getDataList();
                // 隐藏编辑对话框
                this.dialogFormVisible = false;
              } else {
                // 错误的消息提示
                this.$message.error("编辑失败，" + res.data.message);
              }
            });
          }
        }
      });
    },
    // 取消按钮的点击事件
    dialogCancle() {
      // 点击取消的时候也要重置表单并隐藏对话框
      this.dialogFormVisible = false;
      this.$refs.dialogForm.resetFields();
    }
  }
};
</script>

<style>
</style>