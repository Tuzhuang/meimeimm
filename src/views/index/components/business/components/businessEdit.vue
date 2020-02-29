<template>
  <div>
    <el-dialog center width="40%" title="编辑企业" :visible.sync="dialogFormVisible">
      <el-form ref="editForm" :model="form" :rules="rules">
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
        <el-button type="primary" @click="dialogEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入新增学科的接口
import { businessEdit } from "@/api/business.js";

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
        rid: [{ required: true, message: "企业编号不能为空", triggrt: "blur" }],
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "企业简介不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 编辑对话框的确认按钮点击事件
    dialogEdit() {
      // 先验证规则通过之后再发送请求
      this.$refs.editForm.validate(valid => {
        if (valid) {
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
      });
    },
    // 取消按钮的点击事件
    dialogCancle() {
      // 点击取消的时候也要重置表单并隐藏对话框
      this.dialogFormVisible = false;
      this.$refs.editForm.resetFields();
    }
  }
};
</script>

<style>
</style>