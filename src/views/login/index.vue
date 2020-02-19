<template>
  <div class="login-wrap">
    <!-- 左边的表单盒子 -->
    <div class="login-box"></div>
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
  }
}
</style>