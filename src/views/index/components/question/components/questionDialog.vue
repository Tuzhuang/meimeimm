<template>
  <div class="quesDialog">
    <!-- fullscreen  全屏展示  对话框关闭的时候要销毁对话框里面的数据 -->
    <el-dialog
      destroy-on-close
      fullscreen
      :title="isAdd?'新增题库':'编辑题库'"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="quesForm" :model="form" :rules="rules">
        <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
          <!-- 使用全局组件学科下拉框 -->
          <subjectSelect v-model="form.subject"></subjectSelect>
        </el-form-item>
        <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
          <el-select v-model="form.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
          <!-- 使用全局组件企业下拉框 -->
          <businessSelect v-model="form.enterprise"></businessSelect>
        </el-form-item>
        <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
          <!-- 使用全局组件城市级联框 -->
          <ChinaArea v-model="form.city"></ChinaArea>
        </el-form-item>
        <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty" :label-width="formLabelWidth">
          <el-radio-group v-model="form.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 分割线 -->
        <el-form-item class="myhrbox">
          <el-divider class="myhr" content-position="center">Face To Face</el-divider>
        </el-form-item>
        <el-form-item label="试题标题" prop="title" :label-width="formLabelWidth">
          <wangEditor v-model="form.title"></wangEditor>
        </el-form-item>
        <!-- 单选框组 -->
        <el-form-item
          v-if="form.type == '1'"
          label="单选"
          prop="single_select_answer"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="form.single_select_answer">
            <!-- 使用封装后的单选框组件 父组件给子组件传值 -->
            <optionItem
              v-for="(item, index) in form.select_options"
              :key="index"
              :label="item.label"
              :text.sync="item.text"
              :image.sync="item.image"
            ></optionItem>
          </el-radio-group>
        </el-form-item>
        <!-- 多选框组 -->
        <el-form-item
          v-else-if="form.type == '2'"
          label="多选"
          prop="multiple_select_answer"
          :label-width="formLabelWidth"
        >
          <el-checkbox-group v-model="form.multiple_select_answer">
            <!-- 使用封装后的单选框组件 可以改成多选框组件 给组组件传值-->
            <optionItem
              v-for="(item, index) in form.select_options"
              :key="index"
              :label="item.label"
              :text.sync="item.text"
              :image.sync="item.image"
              :isRadio="false"
            ></optionItem>
          </el-checkbox-group>
        </el-form-item>
        <!-- 简答组 -->
        <el-form-item
          v-else-if="form.type == '3'"
          label="简答"
          class="myError"
          prop="short_answer"
          :label-width="formLabelWidth"
        >
          <el-input
            class="textarea"
            v-model="form.short_answer"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <!-- 分割线 -->
        <el-form-item class="myhrbox">
          <el-divider class="myhr" content-position="center">Face To Face</el-divider>
        </el-form-item>
        <el-form-item label="解析视频" prop="video" :label-width="formLabelWidth">
          <!-- 使用封装好的视频解析插件 -->
          <videoUpload :video.sync="form.video"></videoUpload>
        </el-form-item>
        <el-form-item class="myhrbox">
          <el-divider class="myhr" content-position="center">Face To Face</el-divider>
        </el-form-item>
        <el-form-item label="答案解析" prop="answer_analyze" :label-width="formLabelWidth">
          <wangEditor v-model="form.answer_analyze"></wangEditor>
        </el-form-item>
        <el-form-item class="myhrbox">
          <el-divider class="myhr" content-position="center">Face To Face</el-divider>
        </el-form-item>
        <el-form-item class="myError" label="试题备注" prop="remark" :label-width="formLabelWidth">
          <el-input
            class="textarea"
            v-model="form.remark"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="quesAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入新增题库的接口文件
import { quesAdd, quesEdit } from "@/api/question.js";

export default {
  data() {
    return {
      // 对话框默认隐藏
      dialogFormVisible: false,
      // 表单文本宽度
      formLabelWidth: "500px",
      // 表单数据
      form: {
        type: 1,
        // 城市
        city: "",
        // 单选框组的答案
        select_options: [
          {
            label: "A",
            text: "李雅",
            image:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583402875394&di=2e9a31b8e17c10981ae9d5ce7b26cd1b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171011%2F1e662fa8672442b68505c86dd5ba8da6.jpeg"
          },
          {
            label: "B",
            text: "学姐",
            image:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583402875393&di=b93b139c0cc6cd8806b092e0e4ad7958&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180809%2F09e9907c8b134327bd24a206131422b6.jpeg"
          },
          {
            label: "C",
            text: "小程同学",
            image:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583402950874&di=2e8e00ec7ad49266e44586cd262d815a&imgtype=0&src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-8c7ee3322ae3c280f734c7bd04d00f03.jpg"
          },
          {
            label: "D",
            text: "精神小妹",
            image:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583402950874&di=8ad04a380d9b6577d9d5d82f0d8cd5e6&imgtype=0&src=http%3A%2F%2Fimg1.daofengdj.com%2Fuploads%2Fphoto%2F20191208%2F31793fv7zu5jy2xayxr2m0t4vl29p98x.jpg"
          }
        ],
        // 多选框组的答案
        multiple_select_answer: [],
        // 简答题答案
        short_answer: "",
        // 答案解析
        answer_analyze: ""
      },
      rules: {
        subject: { required: true, message: "学科不能为空", trigger: "change" },
        step: { required: true, message: "阶段不能为空", trigger: "change" },
        enterprise: {
          required: true,
          message: "企业不能为空",
          trigger: "change"
        },
        city: { required: true, message: "城市不能为空", trigger: "change" },
        type: { required: true, message: "题型不能为空", trigger: "blur" },
        difficulty: {
          required: true,
          message: "难度不能为空",
          trigger: "blur"
        },
        title: {
          required: true,
          message: "试题标题不能为空",
          trigger: "change"
        },
        single_select_answer: {
          required: true,
          message: "单选框组不能为空",
          trigger: "blur"
        },
        multiple_select_answer: {
          required: true,
          message: "多选框组不能为空",
          trigger: "change"
        },
        short_answer: {
          required: true,
          message: "简答不能为空",
          trigger: "blur"
        },
        answer_analyze: {
          required: true,
          message: "答案解析不能为空",
          trigger: "blur"
        },
        remark: { required: true, message: "试题备注不能为空", trigger: "blur" }
      },
      // 用来判断当前点击的是新增还是编辑
      isAdd: true
    };
  },
  methods: {
    // 新增对话框确认按钮的点击事件
    quesAdd() {
      // 先对整个表单进行验证
      this.$refs.quesForm.validate(valid => {
        if (valid) {
          // 先判断当前进行的是新增还是编辑
          if (this.isAdd) {
            // 表单验证成功之后要发送请求
            quesAdd(this.form).then(res => {
              // console.log(res);
              // 判断
              if (res.data.code === 200) {
                this.$message.success("新增题库成功！");
                // 刷新数据
                this.$parent.getQuesData();
                // 关闭对话框
                this.dialogFormVisible = false;
                // 还要清空表单
                this.$refs.quesForm.resetFields();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            // 编辑的接口
            quesEdit(this.form).then(res => {
              // console.log(res);
              // 判断
              if (res.data.code === 200) {
                this.$message.success("编辑题库成功！");
                // 刷新数据
                this.$parent.getQuesData();
                // 关闭对话框
                this.dialogFormVisible = false;
                // 还要清空表单
                this.$refs.quesForm.resetFields();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        } else {
          // 消息提示
          this.$message.error("表单验证未通过");
        }
      });
    }
  }
};
</script>

<style lang="less">
.quesDialog {
  .el-dialog,
  .is-fullscreen {
    margin-top: 50px !important;
  }
  .el-form-item__label {
    margin-right: 40px;
  }
  .el-select,
  .el-cascader {
    width: 400px !important;
  }
  .myhrbox {
    margin-left: 24%;
    .myhr {
      width: 70%;
    }
  }

  .textarea {
    width: 74%;
    position: relative;
    top: 20px;
    left: -3px;
  }
  .avatar-uploader {
    text-align: left;
    .el-upload {
      border: none;
      margin-top: 30px;
    }
  }
  .video {
    width: 600px;
  }
  .myError .el-form-item__error {
    margin-top: 20px;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>