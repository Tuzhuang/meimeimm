<template>
  <div>
    <el-dialog center width="40%" title="新增学科" :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :model="form" :rules="rules">
        <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth" prop="short_name">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth" prop="intro">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
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
// 导入新增学科的接口
import { subjectAdd } from "@/api/subject.js";

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
        rid: [{ required: true, message: "学科编号不能为空", triggrt: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 新增对话框的确认按钮点击事件
    dialogAdd() {
      // 先验证规则通过之后再发送请求
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 发送请求  可以直接传入对象
          subjectAdd(this.form).then(res => {
            // console.log(res);
            // 判断
            if (res.data.code === 200) {
              // 消息提示
              this.$message.success("学科新增成功");
              // 隐藏对话框
              this.dialogFormVisible = false;
              // 重新请求数据
              this.$parent.getDataList();
              // 新增成功之后要重置表单
              this.$refs.addForm.resetFields();
            } else {
              this.$message.error('新增失败，'+res.data.message);
            }
          });
        }
      });
    },
    // 取消按钮的点击事件
    dialogCancle() {
      // 点击取消的时候也要重置表单并隐藏对话框
      this.dialogFormVisible = false;
      this.$refs.addForm.resetFields();
    }
  }
};
</script>

<style>
</style>