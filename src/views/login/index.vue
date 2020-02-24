<template>
  <div class="login-wrap">
    <!-- 左边的表单盒子 -->
    <div class="login-box">
      <!-- 顶部文字信息 -->
      <div class="title-box">
        <!-- 图片logo -->
        <img class="logo" src="./images/login_logo.png" alt />
        <span class="left-title">Face To Face</span>
        <!-- 竖线 -->
        <span class="line"></span>
        <span class="right-title">用户登录</span>
      </div>
      <!-- 表单部分 -->
      <!-- 给表单设置一个ref属性和一个model属性 还有一个:reles绑定一个规则 -->
      <el-form ref="loginForm" :model="form" :rules="rules" label-width="43px">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" clearable prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item prop="code">
              <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <img @click="getCode" class="login-code" :src="imgCode" alt />
          </el-col>
        </el-row>
        <el-form-item class="checkItem" prop="checked">
          <el-checkbox v-model="form.checked"></el-checkbox>
          <span class="checkTest">
            我已阅读并同意
            <el-link type="primary" class="link" :underline="false">用户协议</el-link>和
            <el-link type="primary" class="link" :underline="false">隐私条款</el-link>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" @click="btnLogin" type="primary" round>登录</el-button>
          <el-button class="btn" @click="btnRegister" type="primary" round>注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img src="./images/login_banner_ele.png" alt />
    <!-- 弹出的注册对话框 -->
    <register ref="register"></register>
  </div>
</template>

<script>
// 导入注册子组件
import register from "./components/register";
// 导入抽取后的接口文件
import { login } from "@/api/login.js";
// 导入抽取后的token文件
import {setToken} from '@/utilis/token.js';

export default {
  // 注册路由
  components: {
    register
  },
  data() {
    return {
      // 跟表单双向绑定的数据
      form: {
        // 手机号
        phone: "",
        // 密码
        password: "",
        // 验证码
        code: "",
        // 多选框
        checked: false
      },
      // 验证码图片
      imgCode: process.env.VUE_APP_URL + "/captcha?type=login",
      // 规则对象
      rules: {
        // 真正得规则
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
          { min: 6, max: 32, message: "密码长度为6-32之间", trigger: "change" }
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        // 多选框得规则  多选框没有失去焦点事件，只有change事件
        // 我们要用正则来判断
        checked: [
          {
            pattern: /true/,
            message: "请勾选用户协议及隐私条款",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 登录按钮得点击事件
    btnLogin() {
      // 找到表单对象，调用validate方法
      this.$refs.loginForm.validate(validate => {
        if (validate) {
          // 表单验证成功,发送请求登录
          login({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.code
          }).then(res => {
            // console.log(res);
            // 判断
            if (res.data.code === 200) {
              // 消息提示
              this.$message.success("恭喜你，登录成功！");
              // 保存token
              // window.localStorage.setItem('mmtoken',res.data.data.token);
              // 调用方法保存token
              setToken(res.data.data.token);
              // 跳转到主页面
              this.$router.push("/");
            } else {
              // 错误的消息提示
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    // 注册按钮的点击事件
    btnRegister() {
      // 修改子组件的bool值
      this.$refs.register.dialogFormVisible = true;
      // 调用注册页获取验证码的方法
      this.$refs.register.getCode();
    },
    // 验证码的点击事件
    getCode() {
      // 给imgCode重新赋值，但是要在后面加上一个参数设置为一个时间戳
      this.imgCode =
        process.env.VUE_APP_URL + "/captcha?type=login&z=" + Date.now();
    }
  }
};
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  //   主轴
  justify-content: space-around;
  //   侧轴居中
  align-items: center;

  .login-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding-right: 41px;
    box-sizing: border-box;
    .title-box {
      display: flex; // 弹性布局让里面的元素变成行内块样式
      align-items: center;
      margin-left: 48px;
      margin-top: 50px;
      margin-bottom: 28px;
      .logo {
        margin-right: 16px;
        width: 22px;
        height: 17px;
      }
      .left-title {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .right-title {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .login-code {
      width: 100%;
      height: 42px;
      // 让图片不要默认基线对齐
      vertical-align: middle;
    }
    .checkItem {
      height: 56px;
      .el-form-item__error {
        position: relative;
        top: -14px;
      }
    }

    .btn {
      width: 100%;
      &:nth-child(2) {
        margin-left: 0px;
        margin-top: 26px;
      }
    }
  }
}
</style>