<template>
  <div class="formBox">
    <el-radio v-if="isRadio" :label="label"></el-radio>
    <el-checkbox v-else :label="label"></el-checkbox>
    <el-input class="input" v-model="selfText" placeholder="请输入内容" @input="onInput"></el-input>
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="selfImg" :src="selfImg" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  // 父组件给子组件传值
  props: {
    label: {
      type: String
    },
    text: {
      type: String
    },
    image: {
      type: String
    },
    isRadio: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 单选框组输入框的值  因为单向数据流，所以要是用中间变量来存储，不可以直接修改
      selfText: this.text,
      //   单选框组图片的地址
      selfImg: this.image,

      // 图片的上传地址
      uploadUrl: process.env.VUE_APP_URL + "/question/upload"
    };
  },
  methods: {
    // 上传成功之后的钩子
    handleAvatarSuccess(res, file) {
      this.selfImg = URL.createObjectURL(file.raw);
      //   console.log(res.data.url);
      // 当图片发生改变的时候就给父组件传值
      this.$emit("update:image", res.data.url);
    },
    // 上传之前执行的钩子
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" || "image/jpg" || "image/png" || "image/gif" || "image/jfif";
      const isLt6M = file.size / 1024 / 1024 < 6;

      if (!isJPG) {
        this.$message.error("上传头像只能是 图片 格式!");
      }
      if (!isLt6M) {
        this.$message.error("上传头像图片大小不能超过 6MB!");
      }
      return isJPG && isLt6M;
    },
    // 输入框输入内容的时候就触发，为了给父组件传值
    onInput() {
      // 给父组件传值
      this.$emit("update:text", this.selfText);
    }
  }
};
</script>

<style lang="less">
.formBox {
  display: flex;
  align-items: center;
  margin-top: 40px;

  .input {
    width: 700px;
    height: 40px;
    margin-right: 30px;
    margin-left: 10px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>