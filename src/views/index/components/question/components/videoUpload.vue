<template>
  <div class="videoBox">
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过2MB</div>
    </el-upload>
    <!-- 视频播放 -->
    <video class="video" :src="videoUrl" controls></video>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: String
    }
  },
  data() {
    return {
      // 视频上传的地址
      uploadUrl: process.env.VUE_APP_URL + "/question/upload",
      // 视频播放的地址
      videoUrl: ""
    };
  },
  methods: {
    // 视频上传成功之后的方法
    handleAvatarSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
      // 给父组件赋值
      this.$emit('update:video',res.data.url)
    },
    // 视频上传之前的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4" || "video/avi";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传视频只能是 视频 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
</style>