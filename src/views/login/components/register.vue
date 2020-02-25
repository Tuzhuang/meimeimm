<template>
  <el-dialog
    class="reg-title"
    title="用户注册"
    :center="true"
    :show-close="false"
    width="603px"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :rules="rules" ref="regForm">
      <!-- 头像上传 -->
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <!-- name 代表上传之后的文件key值 -->
        <el-upload
          v-model="form.avatar"
          name="image"
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" show-password :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="17">
          <el-form-item label="图形码" :label-width="formLabelWidth" prop="graCode">
            <el-input v-model="form.graCode" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <img @click="btnCode" class="codeImg" :src="codeImg" alt />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="17">
          <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-button @click="getUserCode" :disabled="sec != 0">{{sec ==0?'获取用户验证码':'还剩余'+sec+'秒'}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="btnRegister">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入要用到的外部插件
// import axios from "axios";
// 导入封装后的接口请求函数
import { sendsms, register } from "@/api/register.js";

export default {
  name: "reg",
  data() {
    return {
      // 默认隐藏对话框
      dialogFormVisible: false,
      form: {
        avatar: "", // 上传的服务器图片地址
        username: "", // 用户名
        email: "", // 邮箱
        phone: "", // 手机号
        password: "", // 密码
        graCode: "", // 图形码
        rcode: "" // 验证码
      },
      // 验证码的图片  加一个时间戳让每次请求的地址不一样
      codeImg:
        process.env.VUE_APP_URL + "/captcha?type=sendsms&z=" + Date.now(),
      //   倒计时秒钟
      sec: 0,
      // 文字宽度
      formLabelWidth: "120px",
      // 上传头像的临时路径
      imageUrl: "",
      // 图片上传的服务器地址
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      //   规则验证
      rules: {
        // 具体规则验证
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],
        username: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
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
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 32,
            message: "密码只能在6-32位之间",
            trigger: "change"
          }
        ],
        graCode: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { len: 4, message: "图形码只能为4位数", trigger: "blur" }
        ],
        rcode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { len: 4, message: "验证码只能为4位数", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 获取验证码的方法
    getCode() {
      this.codeImg =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&z=" + Date.now();
    },
    //   验证码的点击事件
    btnCode() {
      // 重新给验证码请求接口  因为浏览器缓存所以要加一个时间戳
      // 调用获取验证码的方法
      this.getCode();
    },
    // 获取用户手机验证码的点击事件
    getUserCode() {
      // 发送接口之前先判断手机号格式是否正确
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone)) {
        return this.$message.error("手机号格式不正确哦");
      }
      // 再判断图片验证码长度是否正确
      if (this.form.graCode.length != 4) {
        return this.$message.error("验证码长度不正确哦");
      }
      //   给倒计时的时间设置为60秒
      this.sec = 60;
      //   设置一个计时器
      let timerID = setInterval(() => {
        this.sec--;
        // 判断，如果当前秒数等于0的时候就停止计时器
        if (this.sec == 0) {
          clearInterval(timerID);
        }
      }, 1000);
      //   发送axios请求获取手机验证码
      // 调用封装后的axios接口函数
      sendsms({
        // 传参
        code: this.form.graCode,
        phone: this.form.phone
      }).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          // 成功的消息提示
          this.$message.success(
            "获取成功，验证码为：" +
              res.data.data.captcha +
              "，打死也不要告诉别人哦"
          );
        } else {
          // 错误的消息提示
          this.$message.error(res.data.message);
        }
      });
    },
    // 图片上传成功之后执行的函数
    handleAvatarSuccess(res, file) {
      // 给img图片的临时路径赋值
      this.imageUrl = URL.createObjectURL(file.raw);
      // 给上传的表单赋值服务器的真实图片地址
      this.form.avatar = res.data.file_path;
      // 上传成功之后重新对上传组件重新进行一次校验
      this.$refs.regForm.validateField("avatar");
    },
    // 图片上传之前执行的函数
    beforeAvatarUpload(file) {
      // file 代表上传之前图片的信息，进项下面的判断
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt6M = file.size / 1024 / 1024 < 6;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt6M) {
        this.$message.error("上传头像图片大小不能超过 6MB!");
      }
      return isJPG && isLt6M;
    },
    // 注册页面确认按钮的点击事件
    btnRegister() {
      // 先对表单进行验证
      this.$refs.regForm.validate(valid => {
        if (valid) {
          // 全部验证成功的时候发送请求注册用户
          register({
            username: this.form.username,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            // console.log(res);
            // 判断
            if (res.data.code === 200) {
              // 成功
              // 关闭注册框
              this.dialogFormVisible = false;
              // 消息提示
              this.$message.success("注册成功，请登录");
              // 注册成功的时候要清空表单
              this.$refs.regForm.resetFields();
              // 还要把图片的临时路径清空
              this.imageUrl = "";
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.el-dialog__wrapper {
  top: -50px !important;
}
.el-dialog__header {
  background: linear-gradient(to right, #02c6fc, #1f90ef);
  padding: 15px 20px 15px !important;
  .el-dialog__title {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: white;
  }
}
.codeImg {
  // 验证码宽度
  width: 100%;
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
.avatar-uploader {
  // 让上传内容居中
  text-align: center;
}
.avatar-uploader {
  .avatar-uploader-icon {
    width: 178px;
    height: 178px;
    line-height: 178px;
  }
}
</style>