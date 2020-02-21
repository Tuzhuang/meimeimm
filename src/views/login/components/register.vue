<template>
  <el-dialog
    title="用户注册"
    :center="true"
    :show-close="false"
    width="603px"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :rules="rules">
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="user">
        <el-input v-model="form.user" autocomplete="off"></el-input>
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
          <el-form-item label="图形码" :label-width="formLabelWidth">
            <el-input v-model="form.graCode" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <img @click="btnCode" class="codeImg" :src="codeImg" alt />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="17">
          <el-form-item label="验证码" :label-width="formLabelWidth">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-button @click="getUserCode" :disabled="sec != 0">{{sec ==0?'获取用户验证码':'还剩余'+sec+'秒'}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入要用到的外部插件
import axios from "axios";

export default {
  data() {
    return {
      // 默认隐藏对话框
      dialogFormVisible: false,
      form: {
        user: "",
        email: "",
        phone: "",
        password: "",
        graCode: ""
      },
      // 验证码的图片  加一个时间戳让每次请求的地址不一样
      codeImg:
        process.env.VUE_APP_URL + "/captcha?type=sendsms&z=" + Date.now(),
      //   倒计时秒钟
      sec: 0,
      // 文字宽度
      formLabelWidth: "120px",
      //   规则验证
      rules: {
        // 具体规则验证
        user: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
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
        ]
      }
    };
  },
  methods: {
    //   验证码的点击事件
    btnCode() {
      // 重新给验证码请求接口  因为浏览器缓存所以要加一个时间戳
      this.codeImg =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&z=" + Date.now();
    },
    // 获取用户验证码的点击事件
    getUserCode() {
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
      // axios如果发送跨域请求默认不会携带cookie，所以要额外加一个属性
      axios({
        method: "post",
        url: process.env.VUE_APP_URL + "/sendsms",
        data: {
          code: this.form.graCode,
          phone: this.form.phone
        },
        // 允许携带cookie
        withCredentials: true
      }).then(res => {
        window.console.log(res);
        if(res.data.code==200){
            alert('获取成功，验证码为'+res.data.data.captcha);
        }else{
            alert(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #02c6fc, #1f90ef);
  padding: 15px 20px 15px !important;
  .el-dialog__title {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(254, 254, 254, 1);
  }
}
.codeImg {
  width: 100%;
}
</style>