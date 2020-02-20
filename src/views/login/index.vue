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
      <el-form label-width="43px">
        <el-form-item>
          <el-input placeholder="请输入手机号" clearable prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item>
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <img class="login-code" src="./images/login_code.png" alt />
          </el-col>
        </el-row>
        <el-form-item class="checkItem">
          <el-checkbox ></el-checkbox>
          <span class="checkTest">
            我已阅读并同意
            <el-link type="primary" class="link" :underline="false">用户协议</el-link>和
            <el-link type="primary" class="link" :underline="false">隐私条款</el-link>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" round>登录</el-button>
          <el-button class="btn" type="primary" round>注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img src="./images/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {};
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
    }
    .checkItem {
      // display: flex;
      // justify-items: center;
      // align-items: center;
      // .checkTest {
      //   display: flex;
      //   align-items: center;
      // }
      .link {
        margin-top: -2px;
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